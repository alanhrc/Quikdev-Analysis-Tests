import { Order } from '@domain/orders/entities/order';
import { OrderRepository } from '@domain/orders/repository/order-repositories';
import { Prisma } from '@prisma/client';

export class InMemoryOrderRepository implements OrderRepository {
  order: Order[] = [];

  async create(order: Order): Promise<Order> {
    this.order.push(order);

    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.order;
  }

  async findOne(args: Prisma.OrderFindFirstArgs): Promise<Order | null> {
    const order = this.order.find((order) => {
      if (order.id === args?.where?.id) {
        return order;
      }
    });

    return order ? order : null;
  }

  async update(id: string, order: Order): Promise<Order> {
    const existingOrder = this.order.find((o) => o.id === id);

    if (!existingOrder) {
      throw new Error('Order not found');
    }

    existingOrder.address = order.address;
    existingOrder.name = order.name;
    existingOrder.status = order.status;

    return existingOrder;
  }

  clearOrders(): void {
    this.order = [];
  }
}
