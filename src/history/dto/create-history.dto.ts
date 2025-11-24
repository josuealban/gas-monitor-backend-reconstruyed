import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';

export enum HistoryEventType {
  USER_STATUS_CHANGE = 'USER_STATUS_CHANGE',
  GAS_THRESHOLD_EXCEEDED = 'GAS_THRESHOLD_EXCEEDED',
  SYSTEM_MESSAGE = 'SYSTEM_MESSAGE',
  LOGIN = 'LOGIN',
}

export class CreateHistoryDto {
  @ApiPropertyOptional({
    description: 'Descripción del evento ocurrido',
    example: 'El usuario cambió su estado a Inactivo',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Tipo de evento registrado en historial',
    enum: HistoryEventType,
    example: HistoryEventType.USER_STATUS_CHANGE,
  })
  @IsOptional()
  @IsEnum(HistoryEventType)
  type?: HistoryEventType;

  @ApiPropertyOptional({
    description: 'ID del usuario afectado por el evento',
    example: 4,
  })
  @IsOptional()
  @IsNumber()
  userId?: number;
}
