<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User; 

class DocentesController extends Controller
{
    public function validarDocente($id){
        header('Access-Control-Allow-Origin','*');
        header('Access-Control-Allow-Methods','*'); 

        $is_docente=User::select('*')->where('id',$id)->where('docente',1)->get();
         if(count($is_docente)>0){
             $data=array(
                 'message'=>'es docente',
                 'result'=>true
             );
         }else{
            $data=array(
                'message'=>'no es docente',
                'result'=>false
            );         
        }

    return response()->json($data,200);

    }
}
