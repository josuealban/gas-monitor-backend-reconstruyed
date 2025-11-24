import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateSystemMessageDto {
  @IsString()
  content: string;

  @IsOptional()
  @IsNumber()
  userId?: number;
}
