<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User; 
use App\Docente; 
use Illuminate\Support\Facades\DB; 

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
    //Método para asignar un docente a una materia, recibe, id de usuario, id de materia y sit. de revista (titular, interino,suplente, etc.)
    public function asignarDocenteMateria($id_user,$id_materia,$revista){
        header('Access-Control-Allow-Origin','*');
        header('Access-Control-Allow-Methods','*'); 
        $docente = new Docente(); 
        $docente->user_id=$id_user;
        $docente->materia_id=$id_materia;
        $docente->revista=$revista;
        $docente->save();
        $data=array(
            'docente'=>$docente,
            'status'=>'success'
        );
        return response()->json($data,200);
    }

    public function getMateriasByUserId($id_user){
        header('Access-Control-Allow-Origin','*');
        header('Access-Control-Allow-Methods','*'); 
        //$materias = Docente::select('*')->where('user_id',$id_user)->get()->load('user','materia');
        $materias=DB::connection('cens15Local')->select("call sp_getMateriasByIdUser('$id_user')");
        $data=array(
            'materias'=>$materias,
            'status'=>'success'
        );
        return response()->json($data,200);
    }
}
