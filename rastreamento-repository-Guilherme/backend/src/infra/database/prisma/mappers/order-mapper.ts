import { Order } from '@domain/orders/entities/order';
import { Order as RawOrder } from '@prisma/client';

export class OrderMapperPrisma {
  static toPrisma(order: Order): RawOrder {
    return {
      id: order.id ? String(order.id) : null,
      name: order.name,
      address: order.address,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }

  static ToDomain(raw: RawOrder): Order {
    return new Order(
      {
        name: raw.name,
        address: raw.address,
        status: raw.status as
          | 'Em separacao'
          | 'Entregue a transportadora'
          | 'A caminho'
          | 'Rota de entrega'
          | 'Entregue',
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      String(raw.id),
    );
  }
}
