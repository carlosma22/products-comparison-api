/**
 * Interfaz que define la estructura de un producto
 * Utilizada para tipar los datos de productos en toda la aplicación
 */
export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  rating: number;
  specifications: ProductSpecification[];
}

/**
 * Interfaz para las especificaciones técnicas de un producto
 */
export interface ProductSpecification {
  key: string;
  value: string;
}
