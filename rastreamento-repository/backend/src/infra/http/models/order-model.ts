import { Order } from '@domain/orders/entities/order';

export class OrderMOdel {
  static toHttp(order: Order) {
    return {
      createdAt: order.createdAt,
      name: order.name,
      id: order.id,
      address: order.address,
      status: order.status,
      updatedAt: order.updatedAt,
    };
  }
}
