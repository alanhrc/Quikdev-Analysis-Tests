import { Roles } from '@domain/users/entities/roles.enum';
import { SetMetadata } from '@nestjs/common';

export const HasRoles = (...roles: Roles[]) => SetMetadata('Roles', roles);
