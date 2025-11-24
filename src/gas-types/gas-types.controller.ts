import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GasTypesService } from './gas-types.service';
import { CreateGasTypeDto } from './dto/create-gas-type.dto';
import { UpdateGasTypeDto } from './dto/update-gas-type.dto';

@Controller('gas-types')
export class GasTypesController {
  constructor(private readonly gasTypesService: GasTypesService) {}

  @Post()
  create(@Body() dto: CreateGasTypeDto) {
    return this.gasTypesService.create(dto);
  }

  @Get()
  findAll() {
    return this.gasTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gasTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateGasTypeDto) {
    return this.gasTypesService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gasTypesService.remove(+id);
  }
}
