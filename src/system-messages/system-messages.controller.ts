import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemMessagesService } from './system-messages.service';
import { CreateSystemMessageDto } from './dto/create-system-message.dto';
import { UpdateSystemMessageDto } from './dto/update-system-message.dto';

@Controller('system-messages')
export class SystemMessagesController {
  constructor(private readonly service: SystemMessagesService) {}

  @Post()
  create(@Body() dto: CreateSystemMessageDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSystemMessageDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
