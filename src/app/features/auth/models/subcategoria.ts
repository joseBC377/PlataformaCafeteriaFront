import { CategoriaModel } from "./categoria";

export interface SubcategoriaModel {
    id?:number;
    nombre:string;
    id_categoria:CategoriaModel;
}
