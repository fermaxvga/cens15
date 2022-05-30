<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Preceptor extends Model
{
    protected $table = 'preceptores';

    public function curso()
    {
        return $this->hasMany('App\Curso','curso_key');
    }

}
