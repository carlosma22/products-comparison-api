import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

/**
 * Función principal de arranque de la aplicación
 * Configura Swagger, validaciones globales y filtros de excepciones
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS para permitir peticiones desde cualquier origen
  app.enableCors();

  // Configuración de validaciones globales usando class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza error si hay propiedades no permitidas
      transform: true, // Transforma los payloads a instancias de DTO
      transformOptions: {
        enableImplicitConversion: true, // Convierte tipos automáticamente
      },
    }),
  );

  // Aplicar filtro global de excepciones
  app.useGlobalFilters(new HttpExceptionFilter());

  // Configuración de Swagger para documentación de API
  const config = new DocumentBuilder()
    .setTitle('Products Comparison API')
    .setDescription(
      'API RESTful para comparación de productos. Permite consultar y comparar múltiples productos con sus especificaciones técnicas.',
    )
    .setVersion('1.0')
    .addTag('Products', 'Endpoints relacionados con productos')
    .setContact('Backend Team', 'https://github.com/your-repo', 'backend@example.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Products API Docs',
    customfavIcon: 'https://nestjs.com/img/logo_text.svg',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log('\n🚀 ========================================');
  console.log(`✅ Aplicación iniciada en: http://localhost:${port}`);
  console.log(`📚 Documentación Swagger: http://localhost:${port}/api/docs`);
  console.log(`🔍 Endpoints disponibles:`);
  console.log(`   - GET http://localhost:${port}/products`);
  console.log(`   - GET http://localhost:${port}/products/compare?ids=1,2,3`);
  console.log('🚀 ========================================\n');
}

bootstrap();
