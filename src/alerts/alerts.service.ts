import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Injectable()
export class AlertsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateAlertDto) {
    return (this.prisma as any).alert.create({ data });
  }

  findAll() {
    return (this.prisma as any).alert.findMany({
      include: {
        user: true,
        measurement: true,
      },
    });
  }

  findOne(id: number) {
    return (this.prisma as any).alert.findUnique({
      where: { id },
      include: { user: true, measurement: true },
    });
  }

  update(id: number, dto: UpdateAlertDto) {
    return (this.prisma as any).alert.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return (this.prisma as any).alert.delete({ where: { id } });
  }
}
