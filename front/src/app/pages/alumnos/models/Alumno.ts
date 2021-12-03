export class Alumno{
	constructor(
		public nombre: string,
		public apellido: string,
        public dni: string,
        public fecha_de_nacimiento: string,
		public domiciio: string,
        public loc_nac: string,
        public prov_nac:string,
        public pais_nac:string,
        public tel_alumno:string,
        public email:string,
        public nombre_tutor:string,
        public tel_tutor:string,
        public fot_dni:number,
        public cert_estudio:number,
        public pase:number,
        public cuil:string
		){}
}