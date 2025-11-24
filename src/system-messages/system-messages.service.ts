import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSystemMessageDto } from './dto/create-system-message.dto';
import { UpdateSystemMessageDto } from './dto/update-system-message.dto';

@Injectable()
export class SystemMessagesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateSystemMessageDto) {
    return (this.prisma as any).systemMessage.create({ data });
  }

  findAll() {
    return (this.prisma as any).systemMessage.findMany({
      include: { user: true }
    });
  }

  findOne(id: number) {
    return (this.prisma as any).systemMessage.findUnique({
      where: { id },
      include: { user: true }
    });
  }

  update(id: number, data: UpdateSystemMessageDto) {
    return (this.prisma as any).systemMessage.update({
      where: { id },
      data
    });
  }

  remove(id: number) {
    return (this.prisma as any).systemMessage.delete({
      where: { id }
    });
  }
}
