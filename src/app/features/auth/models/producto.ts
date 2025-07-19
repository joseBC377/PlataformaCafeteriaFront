import { SubcategoriaModel } from "./subcategoria";

export interface ProductoModel {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  subcategoria: SubcategoriaModel; 
}
