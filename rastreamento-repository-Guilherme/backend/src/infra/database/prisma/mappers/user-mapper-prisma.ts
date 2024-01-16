import { Roles } from '@domain/users/entities/roles.enum';
import { User } from '@domain/users/entities/user';
import { UserAccess as RawUserAccess } from '@prisma/client';

export class UserMapperPrisma {
  static toPrisma(user: User): RawUserAccess {
    return {
      createdAt: user.createdAt,
      email: user.email,
      password: user.password,
      id: user.id ? String(user.id) : null,
      name: user.name,
      role: user.role,
      updatedAt: user.updatedAt,
    };
  }

  static ToDomain(raw: RawUserAccess): User {
    return new User(
      {
        createdAt: raw.createdAt,
        email: raw.email,
        password: raw.password,
        name: raw.name,
        role: raw.role as Roles[],
        updatedAt: raw.updatedAt,
      },
      String(raw.id),
    );
  }
}
