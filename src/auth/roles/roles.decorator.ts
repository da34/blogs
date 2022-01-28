import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../users/entities/user.entity';

export const ROLES_KEY = 'role';
export const Roles = (roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
