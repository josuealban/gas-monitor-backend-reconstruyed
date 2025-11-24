import { UserStatus } from '@prisma/client';

export class CreateUserStatusDto {
  userId: number;
  status: UserStatus;
}
