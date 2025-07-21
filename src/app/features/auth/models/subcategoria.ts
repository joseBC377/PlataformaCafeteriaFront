import { CategoriaModel } from "./categoria";

export interface SubcategoriaModel {
  id: number;
  nombre: string;
  categoria: CategoriaModel; 
}
