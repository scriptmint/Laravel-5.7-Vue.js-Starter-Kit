<?php
namespace App;
use Eloquent;

class Configuration extends Eloquent {

	protected $fillable = [
							'name',
							'value',
						];
	protected $primaryKey = 'id';
	protected $table = 'config';
	public $timestamps = false;
}
