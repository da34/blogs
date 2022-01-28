import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/roles/roles.guard';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles } from '../../auth/roles/roles.decorator';
import { UserRole } from '../../users/entities/user.entity';

export function Auth(roles: UserRole[]) {
  return applyDecorators(
    UseGuards(AuthGuard('jwt'), RolesGuard),
    ApiBearerAuth(),
    Roles(roles),
    ApiUnauthorizedResponse({ description: 'Unauthorized"' }),
  );
}
