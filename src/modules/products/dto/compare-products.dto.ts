import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

/**
 * DTO para validar los parámetros de comparación de productos
 * Valida que el parámetro 'ids' sea una cadena de números separados por comas
 */
export class CompareProductsDto {
  @ApiProperty({
    description: 'Lista de IDs de productos separados por comas (ej: 1,2,3)',
    example: '1,2,3',
    required: true,
  })
  @IsNotEmpty({ message: 'El parámetro ids es requerido' })
  @IsString({ message: 'El parámetro ids debe ser una cadena de texto' })
  @Matches(/^(\d+)(,\d+)*$/, {
    message: 'El parámetro ids debe contener números separados por comas (ej: 1,2,3)',
  })
  ids: string;

  /**
   * Método auxiliar para convertir el string de IDs en un array de números
   * @returns Array de números con los IDs de productos
   */
  getIdsArray(): number[] {
    return this.ids.split(',').map((id) => parseInt(id.trim(), 10));
  }
}
