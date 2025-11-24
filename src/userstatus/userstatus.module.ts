import { Module } from '@nestjs/common';
import { UserStatusService } from './userstatus.service';
import { UserStatusController } from './userstatus.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserStatusController],
  providers: [UserStatusService],
  exports: [UserStatusService],
})
export class UserStatusModule {}
