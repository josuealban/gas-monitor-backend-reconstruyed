import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGasTypeDto } from './dto/create-gas-type.dto';
import { UpdateGasTypeDto } from './dto/update-gas-type.dto';

@Injectable()
export class GasTypesService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateGasTypeDto) {
    return (this.prisma as any).gasType.create({ data });
  }

  findAll() {
    return (this.prisma as any).gasType.findMany();
  }

  findOne(id: number) {
    return (this.prisma as any).gasType.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateGasTypeDto) {
    return (this.prisma as any).gasType.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return (this.prisma as any).gasType.delete({ where: { id } });
  }
}
