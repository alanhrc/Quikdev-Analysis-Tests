import { User, UserProps } from '@domain/users/entities/user';
import { Roles } from '@domain/users/entities/roles.enum';
import { randomUUID } from 'crypto';

export function MockUser(
  email: string,
  password: string,
  role: Roles[],
  name?: string,
  createdAt?: Date,
  updatedAt?: Date,
): User {
  const randomId = randomUUID();

  const userProps: UserProps = {
    email,
    password,
    role,
    name: name || 'DefaultName',
    createdAt: createdAt || new Date(),
    updatedAt,
  };

  return new User(userProps, randomId);
}
