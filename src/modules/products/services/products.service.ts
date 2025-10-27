import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../../../interfaces/product.interface';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Servicio que maneja la lógica de negocio para productos
 * Lee datos desde un archivo JSON local y proporciona métodos para consultar productos
 */
@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private readonly dataPath: string;

  constructor() {
    // Ruta al archivo de datos JSON
    this.dataPath = path.join(__dirname, '..', '..', '..', 'config', 'data', 'products.json');
    this.loadProducts();
  }

  /**
   * Carga los productos desde el archivo JSON
   * Se ejecuta al inicializar el servicio
   */
  private loadProducts(): void {
    try {
      const data = fs.readFileSync(this.dataPath, 'utf-8');
      this.products = JSON.parse(data);
      console.log(`✅ ${this.products.length} productos cargados exitosamente`);
    } catch (error) {
      console.error('❌ Error al cargar productos:', error.message);
      this.products = [];
    }
  }

  /**
   * Obtiene todos los productos disponibles
   * @returns Array con todos los productos
   */
  findAll(): Product[] {
    return this.products;
  }

  /**
   * Busca un producto por su ID
   * @param id - ID del producto a buscar
   * @returns El producto encontrado o undefined
   */
  findOne(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  /**
   * Compara múltiples productos por sus IDs
   * @param ids - Array de IDs de productos a comparar
   * @returns Array con los productos encontrados
   * @throws NotFoundException si no se encuentra ningún producto
   */
  compareProducts(ids: number[]): Product[] {
    const foundProducts = ids
      .map((id) => this.findOne(id))
      .filter((product): product is Product => product !== undefined);

    if (foundProducts.length === 0) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'No se encontraron productos con los IDs proporcionados',
        error: 'Not Found',
        requestedIds: ids,
      });
    }

    // Identificar IDs no encontrados para informar al usuario
    const foundIds = foundProducts.map((p) => p.id);
    const notFoundIds = ids.filter((id) => !foundIds.includes(id));

    if (notFoundIds.length > 0) {
      console.warn(`⚠️  IDs no encontrados: ${notFoundIds.join(', ')}`);
    }

    return foundProducts;
  }

  /**
   * Obtiene el número total de productos disponibles
   * @returns Cantidad de productos
   */
  getTotalProducts(): number {
    return this.products.length;
  }
}
