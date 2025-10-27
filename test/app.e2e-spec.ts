import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';

/**
 * Suite de pruebas end-to-end (E2E) para la API
 * Verifica el comportamiento completo de los endpoints
 */
describe('Products API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Aplicar las mismas configuraciones que en main.ts
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /products', () => {
    it('debe retornar todos los productos con status 200', () => {
      return request(app.getHttpServer())
        .get('/products')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it('cada producto debe tener la estructura correcta', () => {
      return request(app.getHttpServer())
        .get('/products')
        .expect(200)
        .expect((res) => {
          const product = res.body[0];
          expect(product).toHaveProperty('id');
          expect(product).toHaveProperty('name');
          expect(product).toHaveProperty('imageUrl');
          expect(product).toHaveProperty('description');
          expect(product).toHaveProperty('price');
          expect(product).toHaveProperty('rating');
          expect(product).toHaveProperty('specifications');
        });
    });
  });

  describe('GET /products/compare', () => {
    it('debe comparar productos con IDs válidos', () => {
      return request(app.getHttpServer())
        .get('/products/compare?ids=1,2')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(2);
          expect(res.body[0].id).toBe(1);
          expect(res.body[1].id).toBe(2);
        });
    });

    it('debe retornar 400 cuando falta el parámetro ids', () => {
      return request(app.getHttpServer())
        .get('/products/compare')
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body).toHaveProperty('message');
        });
    });

    it('debe retornar 400 cuando el formato de ids es inválido', () => {
      return request(app.getHttpServer())
        .get('/products/compare?ids=abc,def')
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 400);
          expect(res.body.message).toContain('números separados por comas');
        });
    });

    it('debe retornar 404 cuando ningún ID existe', () => {
      return request(app.getHttpServer())
        .get('/products/compare?ids=999,998')
        .expect(404)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 404);
          expect(res.body).toHaveProperty('requestedIds');
        });
    });

    it('debe manejar correctamente IDs parcialmente válidos', () => {
      return request(app.getHttpServer())
        .get('/products/compare?ids=1,999')
        .expect(200)
        .expect((res) => {
          expect(res.body.length).toBe(1);
          expect(res.body[0].id).toBe(1);
        });
    });
  });
});
