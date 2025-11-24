import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, MinLength } from 'class-validator';

export class CreateSystemMessageDto {
  @ApiProperty({
    description: 'Contenido del mensaje del sistema',
    example: 'El sistema será actualizado mañana a las 3PM.',
  })
  @IsString()
  @MinLength(3, { message: 'El contenido debe tener mínimo 3 caracteres' })
  content: string;

  @ApiPropertyOptional({
    description: 'ID del usuario asociado al mensaje (si aplica)',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  userId?: number;
}
