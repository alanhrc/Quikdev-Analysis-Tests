import { Roles } from '@domain/users/entities/roles.enum';

export interface IUpdateUser {
  name?: string;
  email?: string;
  role?: Roles[];
  password?: string;
}
