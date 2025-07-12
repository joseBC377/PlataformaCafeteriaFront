import { SubcategoriaModel } from "./subcategoria";

export interface ProductoModel {
    id?:number;
    nombre:string;
    descripcion:string;
    id_subcategoria:SubcategoriaModel;
    imagen:string;
    precio:number;
}
