import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemMessagesService } from './system-messages.service';
import { CreateSystemMessageDto } from './dto/create-system-message.dto';
import { UpdateSystemMessageDto } from './dto/update-system-message.dto';

@Controller('system-messages')
export class SystemMessagesController {
  constructor(private readonly systemMessagesService: SystemMessagesService) {}

  @Post()
  create(@Body() createSystemMessageDto: CreateSystemMessageDto) {
    return this.systemMessagesService.create(createSystemMessageDto);
  }

  @Get()
  findAll() {
    return this.systemMessagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemMessagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSystemMessageDto: UpdateSystemMessageDto) {
    return this.systemMessagesService.update(+id, updateSystemMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemMessagesService.remove(+id);
  }
}
