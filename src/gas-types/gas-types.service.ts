import { Injectable } from '@nestjs/common';
import { CreateGasTypeDto } from './dto/create-gas-type.dto';
import { UpdateGasTypeDto } from './dto/update-gas-type.dto';

@Injectable()
export class GasTypesService {
  create(createGasTypeDto: CreateGasTypeDto) {
    return 'This action adds a new gasType';
  }

  findAll() {
    return `This action returns all gasTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gasType`;
  }

  update(id: number, updateGasTypeDto: UpdateGasTypeDto) {
    return `This action updates a #${id} gasType`;
  }

  remove(id: number) {
    return `This action removes a #${id} gasType`;
  }
}
