import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from '../services/products.service';
import { CompareProductsDto } from '../dto/compare-products.dto';

/**
 * Suite de pruebas unitarias para ProductsController
 * Verifica el correcto funcionamiento de los endpoints
 */
describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('debe retornar un array de productos', () => {
      const result = controller.findAll();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('debe llamar al método findAll del servicio', () => {
      const spy = jest.spyOn(service, 'findAll');
      controller.findAll();

      expect(spy).toHaveBeenCalled();
    });

    it('debe retornar productos con la estructura correcta', () => {
      const result = controller.findAll();
      const product = result[0];

      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('imageUrl');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('rating');
      expect(product).toHaveProperty('specifications');
    });
  });

  describe('compareProducts', () => {
    it('debe comparar productos con IDs válidos', () => {
      const dto = new CompareProductsDto();
      dto.ids = '1,2';

      const result = controller.compareProducts(dto);

      expect(result).toBeDefined();
      expect(result.length).toBe(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });

    it('debe llamar al método compareProducts del servicio', () => {
      const dto = new CompareProductsDto();
      dto.ids = '1,2';

      const spy = jest.spyOn(service, 'compareProducts');
      controller.compareProducts(dto);

      expect(spy).toHaveBeenCalledWith([1, 2]);
    });

    it('debe manejar un solo ID correctamente', () => {
      const dto = new CompareProductsDto();
      dto.ids = '1';

      const result = controller.compareProducts(dto);

      expect(result).toBeDefined();
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(1);
    });

    it('debe manejar múltiples IDs correctamente', () => {
      const dto = new CompareProductsDto();
      dto.ids = '1,2,3,4,5';

      const result = controller.compareProducts(dto);

      expect(result).toBeDefined();
      expect(result.length).toBe(5);
    });

    it('debe retornar solo productos existentes cuando hay IDs inválidos', () => {
      const dto = new CompareProductsDto();
      dto.ids = '1,999';

      const result = controller.compareProducts(dto);

      expect(result).toBeDefined();
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(1);
    });

    it('debe lanzar NotFoundException cuando ningún ID existe', () => {
      const dto = new CompareProductsDto();
      dto.ids = '999,998';

      expect(() => {
        controller.compareProducts(dto);
      }).toThrow(NotFoundException);
    });

    it('debe convertir correctamente el string de IDs a array', () => {
      const dto = new CompareProductsDto();
      dto.ids = '1,2,3';

      const spy = jest.spyOn(service, 'compareProducts');
      controller.compareProducts(dto);

      expect(spy).toHaveBeenCalledWith([1, 2, 3]);
    });

    it('debe manejar IDs con espacios correctamente', () => {
      const dto = new CompareProductsDto();
      dto.ids = '1, 2, 3';

      const result = controller.compareProducts(dto);

      expect(result).toBeDefined();
      expect(result.length).toBe(3);
    });
  });
});
