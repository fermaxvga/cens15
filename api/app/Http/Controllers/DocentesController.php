<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User; 
use App\Docente; 
use App\AusenciaDocente; 
use Carbon\Carbon; 

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

    public function cargarAusencia(Request $request){
        header('Access-Control-Allow-Origin','*');
        header('Access-Control-Allow-Methods','*');
        $json=$request->input('json',null);
        $params=json_decode($json);
        $docente=$params->docente; 
        $fecha1=$params->date1;
        $fecha2=$params->date2;
     
        $fecha1=Carbon::createFromFormat('Y-m-d H:i:s',$fecha1.' 00:00:00');
        $fecha2=Carbon::createFromFormat('Y-m-d H:i:s',$fecha2.' 00:00:00');
      //  echo 'fecha1: ' . $fecha1 . ' ' . 'fecha2: '.$fecha2;
        $dias=date_diff($fecha1,$fecha2); 
        $dias=$dias->days;
       // dd($fecha1->addDays(2));
    //    echo 'Diferencia->'.$dias; 
       // dd($dias);
  
        for($i=0; $i <= $dias ; $i++){
      //    dd($dias, $i);
            if($i==0){
            $fecha=$fecha1; 
            }else{
                $fecha=$fecha1->addDays(1); 
            }
           // echo $fecha.'<br>';
            $dayOfWeek=$fecha->format('l');
            //echo $dayOfWeek.'<br>' ; 
            if($dayOfWeek!=='Saturday' && $dayOfWeek!=='Sunday'){
                $ausencia=new AusenciaDocente();
                $ausencia->docente=$docente;
                $ausencia->fecha=$fecha;
                $ausencia->save();
            }
       }
       

     //  $ausencias=$this->getAusencia($docente,$fecha1,$fecha2);
       return response()->json('OK',200);

    }

    public function getAusencias($fecha1,$fecha2){
        header('Access-Control-Allow-Origin','*');
        header('Access-Control-Allow-Methods','*');
     //   dd($fecha1,$fecha2);
        try{
            $ausencias=AusenciaDocente::whereBetween('fecha',[$fecha1,$fecha2])->get();
            $data=array(
                'ausencias'=>$ausencias,
                'status'=>'success'
            );
            return response()->json($data,200);
        }catch(\Throwable $th){
            return response()->json($th,400);
        }
    }

    public function deleteAusencia($id){
        header('Access-Control-Allow-Origin','*');
        header('Access-Control-Allow-Methods','*');
        try{
            $ausencia=AusenciaDocente::where('id',$id)->delete();
            $data=array(
                'ausencias'=>$ausencia,
                'status'=>'success'
            );
        }catch(\Throwable $th){
            return response()->json($th,400);
        }

    }
}
