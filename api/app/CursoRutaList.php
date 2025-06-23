<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CursoRutaList extends Model
{
    protected $table = 'cursos_rutas_list';

    public function detail(){

        return $this->hasMany('App\CursoRutaDetail','id_ruta');
    }
}
