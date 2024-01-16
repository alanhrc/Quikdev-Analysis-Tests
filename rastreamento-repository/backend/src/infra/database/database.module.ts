import { Module } from '@nestjs/common';
import { UserRepositoryPrisma } from './prisma/repositories/user-repository-prisma';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from '@domain/users/repositories/user-repositories';
import { OrderRepository } from '@domain/orders/repository/order-repositories';
import { OrderRepositoryPrisma } from './prisma/repositories/order-repository-prisma';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserRepositoryPrisma,
    },
    {
      provide: OrderRepository,
      useClass: OrderRepositoryPrisma,
    },
  ],
  exports: [UserRepository, OrderRepository],
})

export class Database {}