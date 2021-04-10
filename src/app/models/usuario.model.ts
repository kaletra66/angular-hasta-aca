import { environment } from "src/environments/environment";

export class Usuario {

    public base_url = environment.base_url;

    constructor(
        public nombre: string, 
        public email: string, 
        public password: string, 
        public img: string,
        public google: boolean, 
        public role: string,
        public u_id?: string
    ){

    }

    imprimirUsuario(){
        console.log(this.nombre);
    }

    get imageUrl(){
        // console.log({img:this.img});
        if(this.img !== undefined){
            if(this.img.includes("https")){
                return this.img;
            }
            return `${this.base_url}/uploads/usuarios/${ this.img }`;
        }else{
            return `${this.base_url}/uploads/usuarios/no-image`;
        }
    }
}