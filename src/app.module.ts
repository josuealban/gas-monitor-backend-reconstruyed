import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { UserstatusModule } from './userstatus/userstatus.module';

@Module({
  imports: [
    PrismaModule, 
    UsersModule, UserstatusModule,  
  ],
})
export class AppModule {}
