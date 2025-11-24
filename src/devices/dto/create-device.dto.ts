import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsString()
  apiKey: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
