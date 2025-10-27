import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import { CompareProductsDto } from '../dto/compare-products.dto';
import { Product } from '../../../interfaces/product.interface';

/**
 * Controlador REST para el módulo de productos
 * Expone endpoints para consultar y comparar productos
 */
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Endpoint: GET /products
   * Devuelve todos los productos disponibles
   */
  @Get()
  @ApiOperation({
    summary: 'Obtener todos los productos',
    description: 'Retorna la lista completa de productos disponibles para comparación',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida exitosamente',
    schema: {
      example: [
        {
          id: 1,
          name: 'Smartphone Galaxy S23',
          imageUrl: 'https://example.com/images/galaxy-s23.jpg',
          description: 'Smartphone de última generación con cámara de 50MP',
          price: 899.99,
          rating: 4.7,
          specifications: [
            { key: 'Pantalla', value: '6.1 pulgadas AMOLED' },
            { key: 'Procesador', value: 'Snapdragon 8 Gen 2' },
          ],
        },
      ],
    },
  })
  findAll(): Product[] {
    return this.productsService.findAll();
  }

  /**
   * Endpoint: GET /products/compare?ids=1,2,3
   * Compara productos específicos por sus IDs
   */
  @Get('compare')
  @ApiOperation({
    summary: 'Comparar productos por IDs',
    description:
      'Retorna información detallada de los productos cuyos IDs coincidan con los proporcionados',
  })
  @ApiQuery({
    name: 'ids',
    description: 'IDs de productos separados por comas',
    example: '1,2,3',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Productos comparados exitosamente',
    schema: {
      example: [
        {
          id: 1,
          name: 'Smartphone Galaxy S23',
          imageUrl: 'https://example.com/images/galaxy-s23.jpg',
          description: 'Smartphone de última generación con cámara de 50MP',
          price: 899.99,
          rating: 4.7,
          specifications: [
            { key: 'Pantalla', value: '6.1 pulgadas AMOLED' },
            { key: 'Procesador', value: 'Snapdragon 8 Gen 2' },
          ],
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Parámetros de consulta inválidos',
    schema: {
      example: {
        statusCode: 400,
        message: ['El parámetro ids debe contener números separados por comas (ej: 1,2,3)'],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron productos con los IDs proporcionados',
    schema: {
      example: {
        statusCode: 404,
        message: 'No se encontraron productos con los IDs proporcionados',
        error: 'Not Found',
        requestedIds: [1, 2, 3],
      },
    },
  })
  compareProducts(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    query: CompareProductsDto,
  ): Product[] {
    const ids = query.getIdsArray();
    return this.productsService.compareProducts(ids);
  }
}
