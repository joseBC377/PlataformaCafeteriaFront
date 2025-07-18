import { Rol } from "./rol";

export interface UsuarioModel {
    id?:number,
    nombre: string,
    apellido: string,
    correo: string,
    telefono:string,
    contrasena:string,
    rol:Rol,
}
