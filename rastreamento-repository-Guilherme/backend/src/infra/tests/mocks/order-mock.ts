import { Order, OrderProps } from '@domain/orders/entities/order';
import { randomUUID } from 'crypto';

export function MockOrder(
  name: string,
  address: string,
  status:
    | 'Em separacao'
    | 'Entregue a transportadora'
    | 'A caminho'
    | 'Rota de entrega'
    | 'Entregue',
  createdAt?: Date,
  updatedAt?: Date,
) {
  const randomId = randomUUID();

  const orderProps: OrderProps = {
    name: 'Delliv',
    address: 'Rua sao paulo',
    status: 'Entregue',
    createdAt: createdAt || new Date(),
    updatedAt,
  };

  return new Order(orderProps, randomId);
}
