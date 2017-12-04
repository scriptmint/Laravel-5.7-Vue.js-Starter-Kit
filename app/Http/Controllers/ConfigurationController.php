<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ConfigurationController extends Controller
{
	public function store(Request $request){

        $input = $request->all();
        foreach($input as $key => $value){
            $value = (is_array($value)) ? implode(',',$value) : $value;
            $config = \App\Configuration::firstOrNew(['name' => $key]);
            $config->value = $value;
            $config->save();
        }

		$config = \App\Configuration::all()->pluck('value','name')->all();

        return response()->json(['message' => 'Configuration stored successfully!']);
	}

	public function index(){
		$config = \App\Configuration::all()->pluck('value','name')->all();
		return response()->json(compact('config'));
	}
}
