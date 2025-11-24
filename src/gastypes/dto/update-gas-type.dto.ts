import { PartialType } from '@nestjs/mapped-types';
import { CreateGasTypeDto } from './create-gas-type.dto';

export class UpdateGasTypeDto extends PartialType(CreateGasTypeDto) {}
