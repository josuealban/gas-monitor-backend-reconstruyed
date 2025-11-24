import { Module } from '@nestjs/common';
import { GasTypesService } from './gas-types.service';
import { GasTypesController } from './gas-types.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GasTypesController],
  providers: [GasTypesService],
  exports: [GasTypesService],
})
export class GasTypesModule {}
