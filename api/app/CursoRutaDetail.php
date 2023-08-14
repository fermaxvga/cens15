<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CursoRutaDetail extends Model
{
    protected $table = 'cursos_rutas_detail';

    public function curso(){

        return $this->belongsTo('App\Curso','id_curso');
    }
}
