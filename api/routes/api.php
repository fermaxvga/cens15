<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::post('/user-register','UserSgaController@register');
// Route::get('/validar-dni/{dni}','UserSgaController@validarDni');

Route::group(['prefix'=>'usuarios'],function(){
    Route::get('/listado','UserSgaController@getUsers');
    Route::post('/register','UserSgaController@register');
    Route::post('/login','UserSgaController@login');
    Route::get('/validar-dni/{dni}','UserSgaController@validarDni');
    Route::post('/precargar','UserSgaController@precargarUsuario');
    Route::get('/listar-precargados','UserSgaController@getPrecargados');
    Route::delete('/delete-precargados/{id}','UserSgaController@deletePrecargados');
    Route::put('/update/{id}','UserSgaController@updateUser');
    Route::get('/usuario/{id}','UserSgaController@getUser');
    Route::get('/roles','UserSgaController@getRoles');
    Route::delete('/borrar/{id}','UserSgaController@deleteUser');
});

Route::group(['prefix'=>'alumnos'],function(){
    Route::get('/listado','AlumnosController@getAlumnos');
    Route::get('/listado-por-curso/{id_curso}','AlumnosController@getAlumnosByCurso');
    Route::get('/{id}','AlumnosController@getAlumno');
    Route::get('/notas/{id}','AlumnosController@getNotas');
    Route::post('/inscribir','AlumnosController@inscribirAlumno');
    Route::post('/inscripcion-masiva','AlumnosController@inscripcionMasiva');
    Route::get('/historico-inscripciones/{dni}','AlumnosController@getInscripciones');
    Route::get('/reinscribir/{id_alumno}/{id_curso}/{anio}','AlumnosController@reinscribir');
    Route::get('/inscripcion-orientacion/{id_alumno}','AlumnosController@getInscripcionActual');
    Route::delete('/eliminar-alumno/{id_alumno}','AlumnosController@deleteAlumno');
    Route::put('/editar-alumno/{id_alumno}','AlumnosController@editAlumno');

        /**De emergencia */
    Route::get('/cargar-materias-alumno/{id_curso}','AlumnosController@cargarMaterias');
        /**/


});

Route::group(['prefix'=>'cursos'],function(){
    Route::get('/listado','CursosController@getCursos');   
    Route::get('/cursos','CursosController@getNroCursos');    
    Route::get('/division','CursosController@getDivisiones');    
    Route::get('/especialidad','CursosController@getEspecialidades');    
    Route::get('/modalidad','CursosController@getModalidad');    
    Route::post('/agregar','CursosController@saveCurso'); 
    Route::put('/update/{id}','CursosController@updateCurso');
    Route::get('/consultar/{curso}/{division}','CursosController@getCurso');
    Route::get('/consultar/{id}','CursosController@getCursoById');  
    Route::delete('/delete/{id}','CursosController@deleteCurso');  
    Route::get('/materias-curso/{id_curso}','CursosController@materiasPorCurso');
    Route::post('/preceptor','CursosController@asignarPreceptor');
    Route::get('/preceptor/{id}','CursosController@buscarPreceptor');
    Route::get('/id-curso/{curso}','CursosController@idCursoByCurso');
    Route::get('/anios/{curso}','CursosController@getAniosCursos');
    Route::get('/rutas','CursosController@getRutas');
    Route::post('/rutas','CursosController@crearRuta');
<<<<<<< HEAD
    Route::put('/rutas/{id}','CursosController@editRuta');
    Route::get('/cursos-rutas/{id_ruta}','CursosController@getCursosByIdRutas');
=======
>>>>>>> 3448f51ab4e12b8cf4d9a5f3973175d48ac96f6e
});

Route::group(['prefix'=>'materias'],function(){
    Route::post('/agregar','MateriaController@saveMateria');
    Route::get('/listar','MateriaController@getMaterias');
    Route::get('/get/{id}','MateriaController@getMateriaById');
    Route::put('/update/{id}','MateriaController@updateMateria');
    Route::delete('/delete/{id}','MateriaController@deleteMateria');
    Route::get('/por-curso/{id_curso}','MateriaController@getMateriasByIdCurso');
   
});

Route::group(['prefix'=>'notas'],function(){
    Route::get('/{id_alumno}','NotasController@getNotas');
    Route::put('/insertar-nota','NotasController@insertarNota');
    Route::get('/ciclos-alumno/{id_alumno}','NotasController@getCiclosByIdAlumno');
    Route::delete('/eliminar-ciclo/{id_alumno}/{id_curso}','NotasController@eliminarCiclo');
<<<<<<< HEAD
    Route::get('/calificacion-anual/{nota1}/{nota2}','NotasController@calificacionAnual');
=======
>>>>>>> 3448f51ab4e12b8cf4d9a5f3973175d48ac96f6e
});

Route::group(['prefix'=>'docentes'],function(){
    Route::get('/validar/{id}','DocentesController@validarDocente');
    Route::get('/asignar-materia/{id_user}/{id_materia}/{revista}','DocentesController@asignarDocenteMateria');
    Route::get('/mis-materias/{id_user}','DocentesController@getMateriasByUserId');
    Route::post('/ausencias','DocentesController@cargarAusencia');
    Route::get('/ausencias/{fecha1}/{fecha2}','DocentesController@getAusencias');
    Route::delete('/delete-ausencia/{id}','DocentesController@deleteAusencia');
});


