import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { UserStatusModule } from './userstatus/userstatus.module';

@Module({
  imports: [
    PrismaModule, 
    UsersModule, UserStatusModule,  
  ],
})
export class AppModule {}
