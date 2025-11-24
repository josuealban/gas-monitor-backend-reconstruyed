import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';
import { AlertType, HistoryType, RiskLevel } from '@prisma/client';

@Injectable()
export class MeasurementsService {
  constructor(private readonly prisma: PrismaService) {}

  private calcularRiesgo(value: number, threshold: number): RiskLevel {
    if (value >= threshold) return RiskLevel.DANGER;
    if (value >= threshold * 0.7) return RiskLevel.WARNING;
    return RiskLevel.NORMAL;
  }

  async create(dto: CreateMeasurementDto) {

    // 🔥 Validar GasType
    const gasType = await this.prisma.gasType.findUnique({
      where: { id: dto.gasTypeId },
    });

    if (!gasType) {
      throw new NotFoundException(`❌ GasType con ID ${dto.gasTypeId} no existe`);
    }

    // 🔥 Validar Device
    const device = await this.prisma.device.findUnique({
      where: { id: dto.deviceId },
    });

    if (!device) {
      throw new NotFoundException(`❌ Device con ID ${dto.deviceId} no existe`);
    }

    // 🔥 Determinar nivel de riesgo
    const risk = this.calcularRiesgo(dto.value, gasType.threshold);

    // 🔥 Crear medición
    const measurement = await this.prisma.measurement.create({
      data: {
        value: dto.value,
        gasTypeId: dto.gasTypeId,
        deviceId: dto.deviceId,
        riskLevel: risk,
      },
      include: {
        gasType: true,
        device: true,
        alert: true,
      }
    });

    // 🔥 Registrar historial
    await this.prisma.historyLog.create({
      data: {
        event: HistoryType.MEASUREMENT_SAVED,
        description: `📌 Medición guardada: ${measurement.value}${gasType.unit} (${gasType.name}) en ${device.location}`,
        measurementId: measurement.id,
        deviceId: device.id,
      }
    });

    // 🔥 Si hay riesgo, crear alerta y agregar a historial
    if (risk !== RiskLevel.NORMAL) {
      const tipo = risk === RiskLevel.DANGER ? AlertType.GENERAL : AlertType.SYSTEM;

      const alerta = await this.prisma.alert.create({
        data: {
          category: tipo,
          message: `⚠ Alerta — Gas ${gasType.name} en nivel ${risk}: ${measurement.value}${gasType.unit}`,
          measurementId: measurement.id,
        },
      });

      await this.prisma.historyLog.create({
        data: {
          event: HistoryType.ALERT_TRIGGERED,
          description: `🚨 Alerta registrada: ${alerta.message}`,
          measurementId: measurement.id,
        },
      });
    }

    return measurement;
  }

  findAll() {
    return this.prisma.measurement.findMany({
      include: { gasType: true, device: true, alert: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.measurement.findUnique({
      where: { id },
      include: { gasType: true, device: true, alert: true },
    });
  }

  update(id: number, dto: UpdateMeasurementDto) {
    return this.prisma.measurement.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.measurement.delete({
      where: { id },
    });
  }
}
