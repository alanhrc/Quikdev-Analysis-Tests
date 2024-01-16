import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order';
import { OrderRepository } from '../repository/order-repositories';

export interface findAllOrders {
  orders: Order[];
}

@Injectable()
export class FindAllOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<findAllOrders> {
    const orders = await this.orderRepository.findAll();

    return { orders };
  }
}
