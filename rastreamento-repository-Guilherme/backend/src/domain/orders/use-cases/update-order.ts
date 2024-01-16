/* eslint-disable prettier/prettier */
import { OrderRepository } from '../repository/order-repositories';
import ErrorHttp from '@helpers/Errorhttp';
import { Order } from '../entities/order';
import { Injectable } from '@nestjs/common';
import { UserAuthAccess } from '@auth/passportEstrategy/jwt.passport';
import { Roles } from '@domain/users/entities/roles.enum';

export interface IupdateOrder {
  name: string;
  address: string;
  status: 'Em separacao' | 'Entregue a transportadora' | 'A caminho' | 'Rota de entrega' | 'Entregue';
}

@Injectable()
export class UpdateOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(
    id: string,
    { name, address, status }: IupdateOrder,
    user: UserAuthAccess,
  ) {
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

    const updateOrder = new Order(
      {
        name,
        address,
        status,
      },
      id,
    );

    return {
      order: await this.orderRepository.update(id, updateOrder),
    };
  }
}
