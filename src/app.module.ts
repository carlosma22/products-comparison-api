import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';

/**
 * Módulo raíz de la aplicación
 * Importa y configura todos los módulos de la aplicación
 */
@Module({
  imports: [ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
