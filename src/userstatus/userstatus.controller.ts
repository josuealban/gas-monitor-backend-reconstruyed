import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UserStatusService } from './userstatus.service';
import { CreateUserStatusDto } from './dto/create-userstatus.dto';

@Controller('user-status')
export class UserStatusController {
  constructor(private readonly service: UserStatusService) {}

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: CreateUserStatusDto
  ) {
    dto.userId = +id;
    return this.service.updateStatus(dto);
  }
}
