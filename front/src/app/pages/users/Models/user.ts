export class User{
	constructor(
		public name: string,
		public surname: string,
        public email: string,
        public dni: string,
		public password: string,
		public role:string,
		public role_id:number
		){}
}