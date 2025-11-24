import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSystemMessageDto } from './dto/create-system-message.dto';
import { UpdateSystemMessageDto } from './dto/update-system-message.dto';

@Injectable()
export class SystemMessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSystemMessageDto) {
    return await (this.prisma as any).systemMessage.create({ data });
  }

  async findAll() {
    return await (this.prisma as any).systemMessage.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: number) {
    const message = await (this.prisma as any).systemMessage.findUnique({
      where: { id },
      include: { user: true }
    });

    if (!message) {
      throw new NotFoundException(`Mensaje con id ${id} no encontrado`);
    }

    return message;
  }

  async update(id: number, data: UpdateSystemMessageDto) {
    const exists = await (this.prisma as any).systemMessage.findUnique({ where: { id } });

    if (!exists) {
      throw new NotFoundException(`No existe un mensaje con id ${id}`);
    }

    return await (this.prisma as any).systemMessage.update({
      where: { id },
      data
    });
  }

  async remove(id: number) {
    const exists = await (this.prisma as any).systemMessage.findUnique({ where: { id } });

    if (!exists) {
      throw new NotFoundException(`No existe un mensaje con id ${id}`);
    }

    await (this.prisma as any).systemMessage.delete({ where: { id } });

    return { message: `Mensaje con ID ${id} eliminado correctamente` };
  }
}
