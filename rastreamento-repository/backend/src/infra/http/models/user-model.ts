import { User } from '@domain/users/entities/user';

export class UserModel {
  static toHttp(user: User) {
    return {
      createdAt: user.createdAt,
      email: user.email,
      id: user.id,
      name: user.name,
      role: user.role,
      updatedAt: user.updatedAt,
    };
  }
}
