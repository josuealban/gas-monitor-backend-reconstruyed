import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DevicesService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateDeviceDto) {
    return (this.prisma as any).device.create({ data });
  }

  findAll() {
    return (this.prisma as any).device.findMany();
  }

  findOne(id: number) {
    return (this.prisma as any).device.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateDeviceDto) {
    return (this.prisma as any).device.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return (this.prisma as any).device.delete({ where: { id } });
  }
}
