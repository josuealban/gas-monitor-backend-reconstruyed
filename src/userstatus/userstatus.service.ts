import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserStatusDto } from './dto/create-userstatus.dto';
import { UpdateUserStatusDto } from './dto/update-userstatus.dto';
import { HistoryType } from '@prisma/client';

@Injectable()
export class UserStatusService {
  constructor(private prisma: PrismaService) {}

  async updateStatus(dto: CreateUserStatusDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId }
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    const updated = await this.prisma.user.update({
      where: { id: dto.userId },
      data: { status: dto.status },
    });

    // Registrar en el historial
    await (this.prisma as any).history.create({
      data: {
        event: HistoryType.USER_STATUS_CHANGE,
        description: `Estado de usuario actualizado a: ${dto.status}`,
        userId: updated.id
      }
    });

    return updated;
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id }
    });
  }
}
