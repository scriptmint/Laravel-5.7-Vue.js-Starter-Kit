<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
  protected $fillable = [
              'todo'
            ];
  protected $primaryKey = 'id';
  protected $table = 'todos';
}
