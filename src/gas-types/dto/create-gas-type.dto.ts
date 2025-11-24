import { IsString, IsNumber } from 'class-validator';

export class CreateGasTypeDto {
  @IsString()
  name: string;

  @IsNumber()
  threshold: number;
}
