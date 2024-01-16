import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order';
import { OrderRepository } from '../repository/order-repositories';

@Injectable()
export class FindOneOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(args: object): Promise<Order | null> {
    return await this.orderRepository.findOne(args);
  }
}
