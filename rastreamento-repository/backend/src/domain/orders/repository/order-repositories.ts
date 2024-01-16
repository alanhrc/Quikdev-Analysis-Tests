import { Order } from '../entities/order';

export abstract class OrderRepository {
  abstract create(order: Order): Promise<Order>;
  abstract findAll(): Promise<Order[]>;
  abstract findOne(args: object): Promise<Order | null>;
  abstract update(id: string, order: Order): Promise<Order>;
}
