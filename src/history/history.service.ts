import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  
  async create(_: CreateHistoryDto) {
    throw new BadRequestException(' No está permitido crear historial manualmente. Solo el sistema puede hacerlo.');
  }

  
  async registerEvent(data: CreateHistoryDto) {
    return await (this.prisma as any).history.create({
      data,
    });
  }

  async findAll() {
    return await (this.prisma as any).history.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: number) {
    const record = await (this.prisma as any).history.findUnique({
      where: { id },
      include: { user: true }
    });

    if (!record) throw new NotFoundException(`No existe historial con id ${id}`);

    return record;
  }

  
  async update(id: number, data: UpdateHistoryDto) {
    const exists = await (this.prisma as any).history.findUnique({ where: { id } });

    if (!exists) throw new NotFoundException(`No existe historial con id ${id}`);

    return await (this.prisma as any).history.update({
      where: { id },
      data
    });
  }

 
  async remove(_: number) {
    throw new BadRequestException('❌ No está permitido eliminar registros de historial.');
  }
}
