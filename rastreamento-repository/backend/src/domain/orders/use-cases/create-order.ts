/* eslint-disable prettier/prettier */
import { OrderRepository } from '../repository/order-repositories';
import ErrorHttp from '@helpers/Errorhttp';
import { Order } from '../entities/order';
import { Injectable } from '@nestjs/common';
import { UserAuthAccess } from '@auth/passportEstrategy/jwt.passport';
import { Roles } from '@domain/users/entities/roles.enum';

export interface ICreateOrder {
  name: string;
  address: string;
  status:
  | 'Em separacao'
  | 'Entregue a transportadora'
  | 'A caminho'
  | 'Rota de entrega'
  | 'Entregue';
}
@Injectable()
export class CreateOrder {
  constructor(private readonly orderRepository: OrderRepository) { }

  async execute({ name, address, status }: ICreateOrder, user: UserAuthAccess) {
    const statusValid = [
      'Em separacao',
      'Entregue a transportadora',
      'A caminho',
      'Rota de entrega',
      'Entregue',
    ];

    if (!statusValid.includes(status)) {
      throw ErrorHttp(400, 'Status is not valid');
    }

    if (!user || !user.role || user.role.indexOf(Roles.Admin) === -1) {
      throw ErrorHttp(403, 'Not permission');
    }

    const createNewOrder = new Order({
      name,
      address,
      status,
    });

    const response = await this.orderRepository.create(createNewOrder);

    if (response) {
      return { order: createNewOrder };
    }
  }
}
