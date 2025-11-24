import { PartialType } from '@nestjs/mapped-types';
import { CreateUserStatusDto } from './create-userstatus.dto';

export class UpdateUserStatusDto extends PartialType(CreateUserStatusDto) {}
