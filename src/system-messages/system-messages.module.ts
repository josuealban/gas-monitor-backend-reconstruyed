import { Module } from '@nestjs/common';
import { SystemMessagesService } from './system-messages.service';
import { SystemMessagesController } from './system-messages.controller';

@Module({
  controllers: [SystemMessagesController],
  providers: [SystemMessagesService],
})
export class SystemMessagesModule {}
