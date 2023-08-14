<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Alumno;
use App\Curso;
use App\HistoricoInscripciones; 
use App\Materia;
use App\Nota; 

class NotasController extends Controller
{
    public function getNotas($id_alumno){
        header('Access-Control-Allow-Origin','*');
        header('Access-Control-Allow-Methods','*');

        $notas=Nota::select('*')->where('id_alumno',$id_alumno)->get();
        $cursos=Nota::select('curso')->where('id_alumno',$id_alumno)->get()->groupBy('curso');
        $cursos_id=Nota::select('curso','id_curso')->where('id_alumno',$id_alumno)->get();

        $data=array(
            'notas' =>$notas,
            'cursos'=>$cursos,
            'cursos_id'=>$cursos_id, 
            'status' =>'success', 
        );

        return response()->json($data,200);
    }

    public function insertarNota(Request $request){
        header('Access-Control-Allow-Origin','*');
        header('Access-Control-Allow-Methods','*');
        $json=$request->input('json',null);
        $params=json_decode($json);
        $id=$params->id; 
        //dd($params);
        $cuatrimestre1=$params->cuatrimestre1;
        $cuatrimestre2=$params->cuatrimestre2;
        $diciembre=$params->diciembre;
        $febrero=$params->febrero;
        $definitiva=null; 
        $final_anual=null; 
        $observaciones=null; 
        $modalidad=$params->modalidad;
      //  dd($params);
     if($modalidad=='Adolescentes'){
        if(!is_null($cuatrimestre1) && !is_null($cuatrimestre2)){
            $prom=($cuatrimestre1+$cuatrimestre2)/2;
             if($prom<6){
                 if($cuatrimestre1<6 && $cuatrimestre2>=6){
                     $final_anual=$prom;  
                     $observaciones='Recup.1ro';
                 }
                if($cuatrimestre2<6 && $cuatrimestre1>=6){
                    $final_anual=$prom;  
                    $observaciones='Recup.2do'; 
                    }
                if($cuatrimestre2<6 && $cuatrimestre1<6){
                    $final_anual=$prom;  
                    $observaciones='Recup.1ro y 2do'; 
                }
             }

             if($prom>=6 && $cuatrimestre2>=6){
                 if($cuatrimestre1<4){
                    $observaciones='Recup. 1ro';
                    $final_anual=$prom;
                    $definitiva=null;
                 }else{
                    $observaciones='Aprobado'; 
                    $final_anual=$prom;
                    $definitiva=$prom; 
                 }
             }
            if($prom>=6 && $cuatrimestre2<6){
               $final_anual=$prom;
              // $febrero=null;
              // $definitiva=null; 
               $observaciones='Recup. 2do'; 
           }

       }
       if(!is_null($diciembre)){
                    if($diciembre>=6){
                          $definitiva=$diciembre; 
                          $observaciones='Aprobado';
                    }else{
                       $observaciones='Rinde en Feb.';
           }
       }
       if(!is_null($febrero)){
                    if($febrero>=6){
       //                 $final_anual=$febrero;
       //                 //$febrero=null;
                        $definitiva=$febrero; 
                        $observaciones='Aprobado'; 
                    }else{
       //                 $final_anual=null;
       //                 //$febrero=null;
       //                 $definitiva=null;
                        $observaciones='Libre';
                    }
       }

     }
     if($modalidad=='Adultos'){
      //   dd($modalidad);
        if(!is_null($cuatrimestre1) && !is_null($cuatrimestre1)){
            $prom=($cuatrimestre1+$cuatrimestre2)/2;
            //CASO - DEBE RENDIR EN DICIEMBRE
             if($prom<6){
                 if($cuatrimestre1<6 && $cuatrimestre2>=6){
                     $final_anual=$prom;  
                     $observaciones='Recup.1ro';
                 }
                if($cuatrimestre2<6 && $cuatrimestre1>=6){
                    $final_anual=$prom;  
                    $observaciones='Recup.2do'; 
                    }
                if($cuatrimestre2<6 && $cuatrimestre1<6){
                    $final_anual=$prom;  
                    $observaciones='Recup.1ro y 2do'; 
                }
             }


             if($prom>=6 && $cuatrimestre2>=6){
                if($cuatrimestre1<4){
                   $observaciones='Recup. 1ro';
                   $final_anual=$prom;
                   $definitiva=null;
                }else{
                   $observaciones='Aprobado'; 
                   $final_anual=$prom;
                   $definitiva=$prom; 
                }
            }
        //     if($prom>=6 && $cuatrimestre2<6){
        //        $final_anual=$prom;
        //       // $febrero=null;
        //       // $definitiva=null; 
        //        $observaciones='Recup. 2do'; 
        //    }
       }
       if(!is_null($diciembre)){
                    if($diciembre>=4){
                          $definitiva=$diciembre; 
                          $observaciones='Aprobado';
                    }else{
                       $observaciones='Rinde en Feb.';
           }
       }
       if(!is_null($febrero)){
                    if($febrero>=4){
       //                 $final_anual=$febrero;
       //                 //$febrero=null;
                        $definitiva=$febrero; 
                        $observaciones='Aprobado'; 
                    }else{
       //                 $final_anual=null;
       //                 //$febrero=null;
       //                 $definitiva=null;
                        $observaciones='Libre';
                    }
       }


     }
        
        $update=array(
            'cuatrimestre1'=> $cuatrimestre1,
            'cuatrimestre2'=> $cuatrimestre2,
            'diciembre'=> $diciembre,
            'febrero'=> $febrero,
            'final_anual'=> $final_anual,
            'definitiva'=>$definitiva,
            'observaciones'=>$observaciones
        );
      
        $nota=Nota::select('*')->where('id',$id)->update($update);

        $data=array(
            'notas' =>$nota,
            'status' =>'success', 
        );

        return response()->json($data,200);
    }


    public function yearInscripcion($id_alumno,$curso){
        header('Access-Control-Allow-Origin','*');
        header('Access-Control-Allow-Methods','*');
        $year=HistoricoInscripciones::select('*')
                                                ->where('curso',$curso)
                                                ->where('id_alumno',$id_alumno)
                                                ->get();
        
        return $year;
    }


     public function eliminarCiclo($id_alumno,$id_curso){
        header('Access-Control-Allow-Origin','*');
        header('Access-Control-Allow-Methods','*');
       // dd($id_alumno,$curso);
        $ciclo=Nota::select('*')
                        ->where('id_curso',$id_curso)
                        ->where('id_alumno',$id_alumno)
                        ->delete();
       // dd($ciclo);
        
        $data=array(
            'ciclo' =>$ciclo,
            'status' =>'success', 
        );

        return response()->json($data,200);
     }


     public function getCiclosByIdAlumno($id_alumno){
        header('Access-Control-Allow-Origin','*');
        header('Access-Control-Allow-Methods','*');
        $ciclos=Nota::select('id_curso','curso','anio')->where('id_alumno',$id_alumno)->distinct('id_curso')->get();
        $data=array(
            'status' =>'success',
            'ciclos' =>$ciclos
        );

        return response()->json($data,200);


     }

}
