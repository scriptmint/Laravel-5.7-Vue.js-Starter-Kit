<?php
namespace App;
use Eloquent;

class Profile extends Eloquent {

    protected $fillable = [
                            'user_id',
                            'first_name',
                            'last_name',
                            'gender',
                            'date_of_birth',
                            'facebook_profile',
                            'twitter_profile',
                            'google_plus_profile',
                            'avatar'
                        ];
    protected $primaryKey = 'id';
    protected $table = 'profiles';

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
