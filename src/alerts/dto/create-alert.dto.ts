import { IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { AlertType } from '@prisma/client';

export class CreateAlertDto {
  @IsEnum(AlertType)
  category: AlertType;

  @IsString()
  message: string;

  @IsOptional()
  @IsNumber()
  measurementId?: number;

  @IsOptional()
  @IsNumber()
  userId?: number;
}
