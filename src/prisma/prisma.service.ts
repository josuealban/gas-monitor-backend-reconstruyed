import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
const { PrismaClient } = require('@prisma/client');

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prisma: any;
  gasType: any;
  device: any;
  measurement: any;
  historyLog: any;
  alert: any;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async onModuleInit() {
    await this.prisma.$connect();
    console.log(' Prisma conectado correctamente');
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
    console.log(' Prisma desconectado');
  }
}
