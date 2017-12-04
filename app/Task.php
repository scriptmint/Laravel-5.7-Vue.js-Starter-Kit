<?php
namespace App;
use Eloquent;

class Task extends Eloquent {

	protected $fillable = [
							'title',
							'description',
							'start_date',
							'due_date'
						];
	protected $primaryKey = 'id';
	protected $table = 'tasks';
}
