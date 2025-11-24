import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserStatusDto } from './dto/create-userstatus.dto';
import { UpdateUserStatusDto } from './dto/update-userstatus.dto';
import { HistoryType, PrismaClient } from '@prisma/client';

@Injectable()
export class UserStatusService {
  constructor(private prisma: PrismaService) {}

  // helper to access the generated Prisma client types (casts the wrapped service)
  private get client(): PrismaClient {
    return this.prisma as unknown as PrismaClient;
  }

  async updateStatus(dto: CreateUserStatusDto) {

    // 1️⃣ Validar usuario
    const user = await this.client.user.findUnique({
      where: { id: dto.userId },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${dto.userId} no existe`);
    }

    // 2️⃣ Actualizar estado
    const updated = await this.client.user.update({
      where: { id: dto.userId },
      data: { status: dto.status },
    });

    // 3️⃣ Registrar historial
    await this.client.historyLog.create({
      data: {
        event: HistoryType.USER_STATUS_CHANGE,
        description: `🔁 Estado cambiado a: ${dto.status}`,
        userId: updated.id,
      },
    });

    return updated;
  }

  findOne(id: number) {
    return this.client.user.findUnique({
      where: { id },
    });
  }
}
