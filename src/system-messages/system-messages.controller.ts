import { 
  Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException 
} from '@nestjs/common';
import { SystemMessagesService } from './system-messages.service';
import { CreateSystemMessageDto } from './dto/create-system-message.dto';
import { UpdateSystemMessageDto } from './dto/update-system-message.dto';

@Controller('system-messages')
export class SystemMessagesController {
  constructor(private readonly service: SystemMessagesService) {}

  @Post()
  async create(@Body() dto: CreateSystemMessageDto) {
    return await this.service.create(dto);
  }

  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const message = await this.service.findOne(Number(id));

    if (!message) throw new NotFoundException(`Mensaje con id ${id} no encontrado`);

    return message;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateSystemMessageDto) {
    const updated = await this.service.update(Number(id), dto);

    if (!updated) throw new NotFoundException(`No se pudo actualizar el mensaje con id ${id}`);

    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.service.remove(Number(id));

    if (!deleted) throw new NotFoundException(`No existe un registro con id ${id}`);

    return { message: `Mensaje con ID ${id} eliminado correctamente` };
  }
}
