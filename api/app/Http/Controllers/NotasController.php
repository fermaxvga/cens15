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
        //dd($json);
        $params=json_decode($json);
       // dd(($params->id));
        //$params=$params[0];
        $id=$params->id; 
        $cuatrimestre1=$params->cuatrimestre1;
        $cuatrimestre2=$params->cuatrimestre2;
        $diciembre=$params->diciembre;
        $febrero=$params->febrero;
        $definitiva=null; 
        $final_anual=null; 
        $observaciones=null; 
        $modalidad=$params->modalidad;
     //   dd($params);
        //dd($this->calificacionAnual($cuatrimestre1,$cuatrimestre2));
        if($diciembre!=null || $febrero!=null){
            $resultado=$this->diciembreFebrero($diciembre,$febrero,$modalidad);
         //   dd($resultado);
         $update=array(
            // $this->calificacionAnual($cuatrimestre1,$cuatrimestre2)
            // 'cuatrimestre1'=> $cuatrimestre1,
            // 'cuatrimestre2'=> $cuatrimestre2,
             'diciembre'=> $resultado['diciembre'],
             'febrero'=> $resultado['febrero'],
            // 'final_anual'=> $resultado['final_anual'],
             'definitiva'=>$resultado['definitiva'],
             'observaciones'=>$resultado['observaciones']
         );
         //dd($update);
        }else{
            $resultado=$this->calificacionAnual($cuatrimestre1,$cuatrimestre2);
            $update=array(
                // $this->calificacionAnual($cuatrimestre1,$cuatrimestre2)
                 'cuatrimestre1'=> $cuatrimestre1,
                 'cuatrimestre2'=> $cuatrimestre2,
                // 'diciembre'=> $resultado['diciembre'],
                // 'febrero'=> $resultado['febrero'],
                 'final_anual'=> $resultado['final_anual'],
                // 'definitiva'=>$resultado['definitiva'],
                 'observaciones'=>$resultado['observaciones']
             );
        }
//        dd($resultado['final_anual']); 
        $nota=Nota::select('*')->where('id',$id)->update($update);

        $data=array(
            'notas' =>$nota,
            'status' =>'success', 
        );

        return response()->json($data,200);
     
    }

    public function calificacionAnual($cuatrimestre1=null,$cuatrimestre2=null){
        //**No existe calificación en ningun cuatrimestre */
        if($cuatrimestre1==null && $cuatrimestre2==null){
            $data=array(
                'diciembre'=>null,
                'febrero'=>null,
                'final_anual'=>null,
                'definitiva'=>null,
                'observaciones'=>null
            );
            return $data;
        }

        //**Se califica solo primer Cuatrimestre */
        if($cuatrimestre1>=0 && $cuatrimestre2==null){
            $data=array(
                'diciembre'=>null,
                'febrero'=>null,
                'final_anual'=>null, 
                'definitiva'=>null, 
                'observaciones'=>null 
            );
            return $data;
        }
        //**Segundo cuatrimestre */
        //** Ambas notas calificadas */
        if($cuatrimestre1>=0 && $cuatrimestre2>=0){
            $prom=($cuatrimestre1+$cuatrimestre2)/2;
            if($prom>=6){
                //**Promedio Mayor a 6 */
                if($cuatrimestre2>=6){
                    //**Ambos cuatrimestres aprobados */
                    $data=array(
                        'diciembre'=>null,
                        'febrero'=>null,
                        'final_anual'=>$prom,
                        'definitiva'=>$prom,
                        'observaciones'=>'Aprobado'
                    );
                    return $data;
                }else{
                //**Si no aprobó el 2do, recupera 2do, aunque el promedio sea > 6*/

                    $data=array(
                        'diciembre'=>null,
                        'febrero'=>null,
                        'final_anual'=>$prom,
                        'definitiva'=>$prom,
                        'observaciones'=>'Recup.2do'
                    );
                    return $data;
                }
            }else{
                //**Caso Dic. Recupera 1ro */
                if($cuatrimestre1<6 && $cuatrimestre2>=6){
                    $data=array(
                        'diciembre'=>null,
                        'febrero'=>null,
                        'final_anual'=>$prom, 
                        'definitiva'=>null, 
                        'observaciones'=>'Recup.1ro' 
                    );
                    return $data;
                }
                //**Caso Dic. Recupera 2do */
                if($cuatrimestre1>=6 && $cuatrimestre2<6){
                    $data=array(
                        'diciembre'=>null,
                        'febrero'=>null,
                        'final_anual'=>$prom, 
                        'definitiva'=>null, 
                        'observaciones'=>'Recup.2do'
                    );
                    return $data;
                }
                //**Caso Dic. Recupera 1ro y 2do */
                if($cuatrimestre1<6 && $cuatrimestre2<6){
                    $data=array(
                        'diciembre'=>null,
                        'febrero'=>null,
                        'final_anual'=>$prom, 
                        'definitiva'=>null, 
                        'observaciones'=>'Recup 1ro y 2do'
                    );
                    return $data;
                }
            }
        }
        //**Caso cuando algún cuatrimestre está Sin calificar. */
        if($cuatrimestre1 ==-1 || $cuatrimestre2==-1){
            if($cuatrimestre1 ==-1 && $cuatrimestre2==-1){
                $data=array(
                    'diciembre'=>null,
                    'febrero'=>null,
                    'final_anual'=>null, 
                    'definitiva'=>null, 
                    'observaciones'=>'Sin Calificar'
                );
                return $data;
            }
            
            if($cuatrimestre1 ==-1 && $cuatrimestre2==null){
             //   dd($cuatrimestre1,$cuatrimestre2);
                //**Sin calificar el 1ro y sin nota en el 2do */
                $data=array(
                    'diciembre'=>null,
                    'febrero'=>null,
                    'final_anual'=>null, 
                    'definitiva'=>null, 
                    'observaciones'=>null
                );
                return $data;
            }
            if($cuatrimestre1 ==-1 && $cuatrimestre2>=0){
              //  dd('Hay un cuatri sin calificar');
                //**Sin calificar el 1ro y con nota en el 2do */
              
                if($cuatrimestre2>=6){
                    //**Aprobó el 2do */
                    $data=array(
                        'diciembre'=>null,
                        'febrero'=>null,
                        'final_anual'=>$cuatrimestre2, 
                        'definitiva'=>$cuatrimestre2, 
                        'observaciones'=>'Aprobado'
                    );
                    return $data;

                }else{
                    //**No aprobó el 2do  */
                    $data=array(
                        'diciembre'=>null,
                        'febrero'=>null,
                        'final_anual'=>$cuatrimestre2, 
                        'definitiva'=>null, 
                        'observaciones'=>'Recup. 2do'
                    );
                    return $data;
                }
            }
            //**Cuatrimestre 2 sin calificar, y nota en el 1ro */
            if($cuatrimestre1>=0 && $cuatrimestre2==-1){
                if($cuatrimestre1>=6){
                    //**Aprobó el 1ro. */
                    $data=array(
                        'diciembre'=>null,
                        'febrero'=>null,
                        'final_anual'=>$cuatrimestre1, 
                        'definitiva'=>$cuatrimestre1, 
                        'observaciones'=>'Aprobado'
                    );
                    return $data;
                }else{
                    //**NO Aprobó el 1ro. */
                    $data=array(
                        'diciembre'=>null,
                        'febrero'=>null,
                        'final_anual'=>$cuatrimestre1, 
                        'definitiva'=>null, 
                        'observaciones'=>'Recup. 1ro'
                    );
                    return $data;
                }
            }
            //**TODO    */
            //**Lógica para S/C , se puede hacer aquí o llamar un nuevo método */
        }
    }

    public function diciembreFebrero($diciembre,$febrero,$modalidad){
       // dd('Diciembre o Febrero');
        ///**Rindió en Diciembre */
     //  $prom =  ($cuatrimestre1 + $cuatrimestre2)/2
        if($diciembre>=0 && $febrero==null){
            if(($diciembre>=6 && $modalidad=='Adolescentes') || ($diciembre>=4 && $modalidad=='Adultos')){
                $data=array(
                    'diciembre'=>$diciembre,
                    'febrero'=>null,
                    'final_anual'=>$diciembre,
                    'definitiva'=>$diciembre,
                    'observaciones'=>'Aprobado'
                );
                return $data;
            }else{
                $data=array(
                    'diciembre'=>$diciembre,
                    'febrero'=>null,
                    'final_anual'=>null,
                    'definitiva'=>null,
                    'observaciones'=>'Rinde en Feb.'
                );
                return $data;
            }
        }
        if($febrero>=0){
            if(($febrero>=6 && $modalidad=='Adolescentes') || ($febrero>=4 && $modalidad=='Adultos')){
                $data=array(
                    'diciembre'=>$diciembre,
                    'febrero'=>$febrero,
                    'final_anual'=>$febrero,
                    'definitiva'=>$febrero,
                    'observaciones'=>'Aprobado'
                );
                return $data;
            }else{
                $data=array(
                    'diciembre'=>$diciembre,
                    'febrero'=>$febrero,
                    'final_anual'=>$febrero,
                    'definitiva'=>$febrero,
                    'observaciones'=>'Libre'
                );
                return $data;
            }
        }
    
    
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
