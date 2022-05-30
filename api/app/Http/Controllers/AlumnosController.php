<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; 
use App\Alumno;
use App\Curso;
use App\HistoricoInscripciones; 
use App\Materia;
use App\Nota; 

class AlumnosController extends Controller
{
    public function getAlumnos(){
        header('Access-Control-Allow-Origin','*');
        header('Access-Control-Allow-Methods','*');
        $alumnos=Alumno::select('*')->get()->load('curso');
        if(count($alumnos)==0){
            $data=array(
                'message'=>'No se encontraron alumnos',
                'status'=>'empty'
            );
        }else{
            $data=array(
                'alumnos'=>$alumnos,
                'status'=>'success'
            ); 
        }
        return response()->json($data,200);
    }

    public function getAlumnosByCurso($curso_id){
        header('Access-Control-Allow-Origin','*');
        header('Access-Control-Allow-Methods','*');
        $alumnos=Alumno::select('*')
        ->where('curso_id',$curso_id)
        ->get()
        ->load('curso');
      //  ->groupBy('curso_id');
        if(count($alumnos)==0){
            $data=array(
                'message'=>'No se encontraron alumnos',
                'status'=>'empty'
            );
        }else{
            $data=array(
                'alumnos'=>$alumnos,
                'status'=>'success'
            ); 
        }
        return response()->json($data,200);
    }

    public function getAlumno($id){
        header('Access-Control-Allow-Origin','*');
        header('Access-Control-Allow-Methods','*');
        $alumno=Alumno::select('*')->where('id',$id)->get()
     //   ->load('curso')
        ;
        if(count($alumno)==0){
            $data=array(
                'message'=>'Alumno no encontrado',
                'status'=>'error'
            );
        }else{
            $data=array(
                'alumno'=>$alumno,
                'status'=>'success'
            );
        }

        return response()->json($data,200);

    }

    public function inscribirAlumno(Request $request){
        header('Access-Control-Allow-Origin','*');
        header('Access-Control-Allow-Methods','*');
        $json=$request->input('json',null);
        $params=json_decode($json);
        $doc=$params->dni;
        $doc_repetido=Alumno::select('*')->where('dni',$doc)->count();
        if($doc_repetido==0){
            $alumno=new Alumno();
            $nombre=(!is_null($json)&&isset($params->nombre))?$params->nombre:null;
            $apellido=(!is_null($json)&&isset($params->apellido))?$params->apellido:null;
            $dni=(!is_null($json)&&isset($params->dni))?$params->dni:null;
            $fecha_de_nacimiento=(!is_null($json)&&isset($params->fecha_de_nacimiento))?$params->fecha_de_nacimiento:null;
            $domicilio=(!is_null($json)&&isset($params->domicilio))?$params->domicilio:null;
            $loc_nac=(!is_null($json)&&isset($params->loc_nac))?$params->loc_nac:null;
            $prov_nac=(!is_null($json)&&isset($params->prov_nac))?$params->prov_nac:null;
            $pais_nac=(!is_null($json)&&isset($params->pais_nac))?$params->pais_nac:null;
            $tel_alumno=(!is_null($json)&&isset($params->tel_alumno))?$params->tel_alumno:null;
            $email=(!is_null($json)&&isset($params->email))?$params->email:null;
            $nombre_tutor=(!is_null($json)&&isset($params->nombre_tutor))?$params->nombre_tutor:null;
            $tel_tutor=(!is_null($json)&&isset($params->tel_tutor))?$params->tel_tutor:null;
            $curso_id=(!is_null($json)&&isset($params->curso))?$params->curso:null;
            $inscripcion=(!is_null($json)&&isset($params->inscripcion))?$params->inscripcion:null;
            $sexo=(!is_null($json)&&isset($params->sexo))?$params->sexo:null;

            $alumno->nombre=$nombre;
            $alumno->apellido=$apellido;
            $alumno->dni=$dni;
            $alumno->fecha_de_nacimiento=$fecha_de_nacimiento;
            $alumno->domicilio=$domicilio;
            $alumno->loc_nac=$loc_nac;
            $alumno->prov_nac=$prov_nac;
            $alumno->pais_nac=$pais_nac;
            $alumno->tel_alumno=$tel_alumno;
            $alumno->email=$email;
            $alumno->nombre_tutor=$nombre_tutor;
            $alumno->tel_tutor=$tel_tutor;
            $alumno->curso_id=$curso_id;
            $alumno->inscripcion=$inscripcion;
            $alumno->sexo=$sexo;


            
    
            if($params->fot_dni){
                $alumno->fot_dni=1;
            }else{
                $alumno->fot_dni=0;
            }
            if($params->cert_estudio){
                $alumno->cert_estudio=1;
            }else{
                $alumno->cert_estudio=0;
            }
            if($params->pase){
                $alumno->pase=1;
            }else{
                $alumno->pase=0;
            }
            if($params->cuil){
                $alumno->cuil=1;
            }else{
                $alumno->cuil=0;
            }
           
            
            $alumno->save(); 
            
           // dd($alumno); 

            $inscripcion=new HistoricoInscripciones();

            $inscripcion->nombre=$params->nombre;
            $inscripcion->apellido=$params->apellido;
            $inscripcion->dni=$params->dni;
            $inscripcion->anio=$params->inscripcion;
           
            $curso=Curso::select('curso','division','especialidad','modalidad')->where('id',$params->curso)->get();
            
            //dd($curso);
            $curso=$curso[0]['curso'].' '.$curso[0]['division'].' '.$curso[0]['especialidad'].' '.$curso[0]['modalidad'];
            
            $inscripcion->curso=$curso; 
            
            $inscripcion->save(); 
            
            //dd($alumno);
           
            $data=array(
                'alumno'=>$alumno,
                'inscripcion'=>$inscripcion, 
                'status'=>'success'
            );

            $materias=Materia::select('materia')->where('id_curso',$alumno->curso_id)->get();

            $curso=Curso::select('curso','division','especialidad','modalidad')->where('id',$params->curso)->get();
            $modalidad=$curso[0]->modalidad; 
            $curso=$curso[0]->curso.' '.$curso[0]->division.' '.$curso[0]->especialidad.' '.$curso[0]->modalidad;

            //Se cargan notas correspondientes al curso seleccionado
            for ($i=0; $i < count($materias) ; $i++) { 
                $nota=new Nota();
                $nota->id_alumno=$alumno->id;
                $nota->id_curso=$params->curso;
                $nota->curso=$curso;
                $nota->anio=$params->inscripcion;
                $nota->modalidad=$modalidad;
                $nota->materia=$materias[$i]->materia;
                $nota->save(); 
            }
        }else{
            $data=array(
                'message'=>'Ya se encuentra un alumno cargado con este DNI',
                'status'=>'repetead'
            );
        }
      
              
         return response()->json($data,200);
    }

    public function getInscripciones($dni){
        header('Access-Control-Allow-Origin','*');
        header('Access-Control-Allow-Methods','*');

        $historico=HistoricoInscripciones::select('*')->where('dni',$dni)->get();
        
        $data=array(
            'historico'=>$historico,
            'status'=>'success'
        );

        return response()->json($data,200);
    }

    public function reinscribir($id_alumno, $id_curso){
        header('Access-Control-Allow-Origin','*');
        header('Access-Control-Allow-Methods','*');

      //  $curso=Curso::select('*')->where('id',$id_curso)->get();

        $alumno=Alumno::select('*')->where('id',$id_alumno)->update(['curso_id'=>$id_curso]);
        $alumno=Alumno::select('*')->where('id',$id_alumno)->get();

      // dd($alumno[0]->id);
        $inscripcion=new HistoricoInscripciones();

        $inscripcion->nombre=$alumno[0]->nombre;
        $inscripcion->apellido=$alumno[0]->apellido;
        $inscripcion->dni=$alumno[0]->dni;
        $inscripcion->anio=$alumno[0]->inscripcion;
            $curso=Curso::select('curso','division','especialidad','modalidad')->where('id',$id_curso)->get();
            $curso=$curso[0]['curso'].' '.$curso[0]['division'].' '.$curso[0]['especialidad'].' '.$curso[0]['modalidad'];
            //dd($curso);
        $inscripcion->curso=$curso; 

        $inscripcion->save(); 

        //dd($inscripcion);
        $materias=Materia::select('materia')->where('id_curso',$id_curso)->get();

        //Se cargan notas correspondientes al curso seleccionado

      for ($i=0; $i < count($materias) ; $i++) { 
        $nota=new Nota();
        $nota->id_alumno=$alumno->id;
        $nota->id_curso=$params->curso;
        $nota->curso=$curso;
        $nota->anio=$params->inscripcion;
        $nota->modalidad=$modalidad;
        $nota->materia=$materias[$i]->materia;
        $nota->save(); 
    }
        $data=array(
            'alumno'=>$alumno,
            'reinscripcion'=>$inscripcion, 
            'status'=>'success'
        );

        return response()->json($data,200);
    }

    public function getNotas($id_alumno){
        header('Access-Control-Allow-Origin','*');
        header('Access-Control-Allow-Methods','*');
        $notas=Nota::select('*')->where('id_alumno',$id_alumno)->get();
        $data=array(
            'notas'=>$notas,
            'status'=>'success'
        );
        
        return response()->json($data,200);
    }

    public function getInscripcionActual($id_alumno){
        header('Access-Control-Allow-Origin','*');
        header('Access-Control-Allow-Methods','*');
        $inscripcion=DB::select("call sp_inscripcion_orientacion($id_alumno)");
        $data=array(
            'inscripcion'=>$inscripcion[0],
            'status'=>'success'
        );
        return response()->json($data,200);
    }

    public function deleteAlumno($id){
        header('Access-Control-Allow-Origin','*');
        header('Access-Control-Allow-Methods','*');
        $borrar=Alumno::select('*')->where('id',$id)->delete();
        $data=array(
            'message'=>'Alumno eliminado',
            'status'=>'success'
        );
        return response()->json($data,200);
    }

    public function editAlumno(Request $request,$id){
        header('Access-Control-Allow-Origin','*');
        header('Access-Control-Allow-Methods','*');
        $json=$request->input('json',null);
        $params=json_decode($json);
        
        $nombre=(!is_null($json)&&isset($params->nombre))?$params->nombre:null;
        $apellido=(!is_null($json)&&isset($params->apellido))?$params->apellido:null;
        $dni=(!is_null($json)&&isset($params->dni))?$params->dni:null;
        $fecha_de_nacimiento=(!is_null($json)&&isset($params->fecha_de_nacimiento))?$params->fecha_de_nacimiento:null;
        $domicilio=(!is_null($json)&&isset($params->domicilio))?$params->domicilio:null;
        $loc_nac=(!is_null($json)&&isset($params->loc_nac))?$params->loc_nac:null;
        $prov_nac=(!is_null($json)&&isset($params->prov_nac))?$params->prov_nac:null;
        $pais_nac=(!is_null($json)&&isset($params->pais_nac))?$params->pais_nac:null;
        $tel_alumno=(!is_null($json)&&isset($params->tel_alumno))?$params->tel_alumno:null;
        $email=(!is_null($json)&&isset($params->email))?$params->email:null;
        $nombre_tutor=(!is_null($json)&&isset($params->nombre_tutor))?$params->nombre_tutor:null;
        $tel_tutor=(!is_null($json)&&isset($params->tel_tutor))?$params->tel_tutor:null;
      //  $curso_id=(!is_null($json)&&isset($params->curso))?$params->curso:null;
      //  $inscripcion=(!is_null($json)&&isset($params->inscripcion))?$params->inscripcion:null;
        $sexo=(!is_null($json)&&isset($params->sexo))?$params->sexo:null;
        
        $update=array(
            'nombre'=>$nombre,
            'apellido'=>$apellido,
            'dni'=>$dni,
             'fecha_de_nacimiento'=>$fecha_de_nacimiento,
             'domicilio'=>$domicilio,
             'loc_nac'=>$loc_nac,
             'prov_nac'=>$prov_nac,
             'pais_nac'=>$pais_nac,
             'tel_alumno'=>$tel_alumno,
             'email'=>$email,
             'nombre_tutor'=>$nombre_tutor,
             'tel_tutor'=>$tel_tutor,
            // 'curso_id'=>$curso_id,
            // 'inscripcion'=>$inscripcion,
             'sexo'=>$sexo
        ); 


         $alumno=Alumno::select('*')->where('id',$id)->update($update); 

         $data=array(
             'alumno'=>$alumno,
             'message'=>'Datos modificados correctamente',
             'status'=>'success'
         );
         return response()->json($data,200); 
    }
}
