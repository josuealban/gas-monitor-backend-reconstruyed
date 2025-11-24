import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DevicesService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateDeviceDto) {
    return this.prisma.device.create({ data });
  }

  findAll() {
    return this.prisma.device.findMany();
  }

  findOne(id: number) {
    return this.prisma.device.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateDeviceDto) {
    return this.prisma.device.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.device.delete({ where: { id } });
  }
}
