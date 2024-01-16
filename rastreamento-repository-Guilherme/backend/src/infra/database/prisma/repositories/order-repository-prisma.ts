import { Order } from '@domain/orders/entities/order';
import { OrderRepository } from '@domain/orders/repository/order-repositories';
import { PrismaService } from '../prisma.service';
import { OrderMapperPrisma } from '../mappers/order-mapper';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class OrderRepositoryPrisma implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(args: object): Promise<Order | any> {
    let user;
    try {
      user = await this.prisma.order.findFirstOrThrow({
        where: args,
      });
    } catch (error) {
      return new NotFoundException('Order not found');
    }
    return user;
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany();

    return orders.map((order) => OrderMapperPrisma.ToDomain(order));
  }

  async create(order: Order): Promise<Order> {
    try {
      const raw = OrderMapperPrisma.toPrisma(order);

      const newOrder = await this.prisma.order.create({
        data: {
          ...raw,
        },
      });

      return OrderMapperPrisma.ToDomain(newOrder);
    } catch (error) {
      throw new Error('While create order error, please contact us');
    }
  }

  async update(id: string, order: Order): Promise<Order> {
    try {
      const raw = OrderMapperPrisma.toPrisma(order);

      const orderUpdate = await this.prisma.order.update({
        where: {
          id,
        },
        data: raw,
      });

      return OrderMapperPrisma.ToDomain(orderUpdate);
    } catch (error) {
      throw new Error('Error updating order, please contact this suport');
    }
  }
}
