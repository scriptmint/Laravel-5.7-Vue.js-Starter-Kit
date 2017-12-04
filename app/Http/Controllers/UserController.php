<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use JWTAuth;

class UserController extends Controller
{

    protected $avatar_path = 'images/users/';

	public function index(){
		$users = \App\User::with('profile');

		if(request()->has('first_name'))
            $query->whereHas('profile',function($q) use ($request){
                $q->where('first_name','like','%'.request('first_name').'%');
            });

		if(request()->has('last_name'))
            $query->whereHas('profile',function($q) use ($request){
                $q->where('last_name','like','%'.request('last_name').'%');
            });

		if(request()->has('email'))
			$users->where('email','like','%'.request('email').'%');

        if(request()->has('status'))
            $users->whereStatus(request('status'));

        if(request('sortBy') == 'first_name' || request('sortBy') == 'last_name')
            $users->with(['profile' => function ($q) {
              $q->orderBy(request('sortBy'), request('order'));
            }]);
        else
            $users->orderBy(request('sortBy'),request('order'));

		return $users->paginate(request('pageLength'));
	}

    public function updateProfile(Request $request){

        $validation = Validator::make($request->all(),[
            'first_name' => 'required|min:2',
            'last_name' => 'required|min:2',
            'date_of_birth' => 'required|date_format:Y-m-d',
            'gender' => 'required|in:male,female'
        ]);

        if($validation->fails())
            return response()->json(['message' => $validation->messages()->first()],422);

        $user = JWTAuth::parseToken()->authenticate();
        $profile = $user->Profile;

        $profile->first_name = request('first_name');
        $profile->last_name = request('last_name');
        $profile->date_of_birth = request('date_of_birth');
        $profile->gender = request('gender');
        $profile->twitter_profile = request('twitter_profile');
        $profile->facebook_profile = request('facebook_profile');
        $profile->google_plus_profile = request('google_plus_profile');
        $profile->save();

        return response()->json(['message' => 'Your profile has been updated!','user' => $user]);
    }

    public function updateAvatar(Request $request){
        $validation = Validator::make($request->all(), [
            'avatar' => 'required|image'
        ]);

        if ($validation->fails())
            return response()->json(['message' => $validation->messages()->first()],422);

        $user = JWTAuth::parseToken()->authenticate();
        $profile = $user->Profile;

        if($profile->avatar && \File::exists($this->avatar_path.$profile->avatar))
            \File::delete($this->avatar_path.$profile->avatar);

        $extension = $request->file('avatar')->getClientOriginalExtension();
        $filename = uniqid();
        $file = $request->file('avatar')->move($this->avatar_path, $filename.".".$extension);
        $img = \Image::make($this->avatar_path.$filename.".".$extension);
        $img->resize(200, null, function ($constraint) {
            $constraint->aspectRatio();
        });
        $img->save($this->avatar_path.$filename.".".$extension);
        $profile->avatar = $filename.".".$extension;
        $profile->save();

        return response()->json(['message' => 'Avatar updated!','profile' => $profile]);
    }

    public function removeAvatar(Request $request){

        $user = JWTAuth::parseToken()->authenticate();

        $profile = $user->Profile;
        if(!$profile->avatar)
            return response()->json(['message' => 'No avatar uploaded!'],422);

        if(\File::exists($this->avatar_path.$profile->avatar))
            \File::delete($this->avatar_path.$profile->avatar);

        $profile->avatar = null;
        $profile->save();

        return response()->json(['message' => 'Avatar removed!']);
    }

    public function destroy(Request $request, $id){
        if(env('IS_DEMO'))
            return response()->json(['message' => 'You are not allowed to perform this action in this mode.'],422);

        $user = \App\User::find($id);

        if(!$user)
            return response()->json(['message' => 'Couldnot find user!'],422);

        if($user->avatar && \File::exists($this->avatar_path.$user->avatar))
            \File::delete($this->avatar_path.$user->avatar);

        $user->delete();

        return response()->json(['success','message' => 'User deleted!']);
    }

    public function dashboard(){
      $users_count = \App\User::count();
      $tasks_count = \App\Task::count();
      $recent_incomplete_tasks = \App\Task::whereStatus(0)->orderBy('due_date','desc')->limit(5)->get();
      return response()->json(compact('users_count','tasks_count','recent_incomplete_tasks'));
    }
}
