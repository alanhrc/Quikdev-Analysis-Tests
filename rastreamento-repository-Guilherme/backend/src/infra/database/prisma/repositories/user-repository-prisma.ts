import { User } from '@domain/users/entities/user';
import { UserRepository } from '@domain/users/repositories/user-repositories';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserMapperPrisma } from '../mappers/user-mapper-prisma';
@Injectable()
export class UserRepositoryPrisma implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(args: object): Promise<User | null> {
    try {
      const user = await this.prisma.userAccess.findFirstOrThrow({
        where: args,
      });
      return user as User;
    } catch (error) {
      console.error('Error in UserRepositoryPrisma.findOne:', error);
      return null;
    }
  }

  async create(user: User): Promise<User> {
    try {
      const raw = UserMapperPrisma.toPrisma(user);

      const newUser = await this.prisma.userAccess.create({
        data: {
          ...raw,
        },
      });

      return UserMapperPrisma.ToDomain(newUser);
    } catch (error) {
      throw new Error('While create user error, please contact us');
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.userAccess.delete({
        where: {
          id,
        },
      });

      return true;
    } catch (error) {
      throw new Error('Error while deleting user');
    }
  }

  async update(id: string, user: User): Promise<User> {
    try {
      const raw = UserMapperPrisma.toPrisma(user);

      const userUpdate = await this.prisma.userAccess.update({
        where: {
          id,
        },
        data: raw,
      });

      return UserMapperPrisma.ToDomain(userUpdate);
    } catch (error) {
      throw new Error('Error updating user');
    }
  }
}
