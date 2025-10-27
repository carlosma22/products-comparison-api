import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';

/**
 * Suite de pruebas unitarias para ProductsService
 * Verifica el correcto funcionamiento de todos los métodos del servicio
 */
describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('debe retornar un array de productos', () => {
      const products = service.findAll();
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
    });

    it('cada producto debe tener la estructura correcta', () => {
      const products = service.findAll();
      const product = products[0];

      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('imageUrl');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('rating');
      expect(product).toHaveProperty('specifications');
      expect(Array.isArray(product.specifications)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('debe retornar un producto cuando el ID existe', () => {
      const product = service.findOne(1);
      expect(product).toBeDefined();
      expect(product.id).toBe(1);
    });

    it('debe retornar undefined cuando el ID no existe', () => {
      const product = service.findOne(999);
      expect(product).toBeUndefined();
    });
  });

  describe('compareProducts', () => {
    it('debe retornar productos cuando los IDs existen', () => {
      const ids = [1, 2];
      const products = service.compareProducts(ids);

      expect(products).toBeDefined();
      expect(products.length).toBe(2);
      expect(products[0].id).toBe(1);
      expect(products[1].id).toBe(2);
    });

    it('debe retornar solo los productos que existen', () => {
      const ids = [1, 999];
      const products = service.compareProducts(ids);

      expect(products).toBeDefined();
      expect(products.length).toBe(1);
      expect(products[0].id).toBe(1);
    });

    it('debe lanzar NotFoundException cuando ningún ID existe', () => {
      const ids = [999, 998];

      expect(() => {
        service.compareProducts(ids);
      }).toThrow(NotFoundException);
    });

    it('debe lanzar NotFoundException con información detallada', () => {
      const ids = [999, 998];

      try {
        service.compareProducts(ids);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.response).toHaveProperty('statusCode', 404);
        expect(error.response).toHaveProperty('requestedIds');
        expect(error.response.requestedIds).toEqual(ids);
      }
    });

    it('debe manejar correctamente un array con un solo ID', () => {
      const ids = [1];
      const products = service.compareProducts(ids);

      expect(products).toBeDefined();
      expect(products.length).toBe(1);
      expect(products[0].id).toBe(1);
    });

    it('debe manejar correctamente múltiples IDs válidos', () => {
      const ids = [1, 2, 3, 4, 5];
      const products = service.compareProducts(ids);

      expect(products).toBeDefined();
      expect(products.length).toBe(5);
      expect(products.map((p) => p.id)).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('getTotalProducts', () => {
    it('debe retornar el número total de productos', () => {
      const total = service.getTotalProducts();
      expect(typeof total).toBe('number');
      expect(total).toBeGreaterThan(0);
    });

    it('el total debe coincidir con la longitud del array de findAll', () => {
      const total = service.getTotalProducts();
      const products = service.findAll();
      expect(total).toBe(products.length);
    });
  });
});
