import ErrorHttp from '@helpers/Errorhttp';
import { UserAuthAccess } from '@auth/passportEstrategy/jwt.passport';
import { Roles } from '@domain/users/entities/roles.enum';
import { randomUUID } from 'crypto';
import { InMemoryOrderRepository } from '@infra/tests/inMemory/order-inmemory';
import { Order } from '@domain/orders/entities/order';
import { UpdateOrder } from '@domain/orders/use-cases/update-order';

describe('Update Order', () => {
  const orderRepository = new InMemoryOrderRepository();
  const updateOrder = new UpdateOrder(orderRepository);

  afterEach(() => {
    orderRepository.clearOrders();
  });

  it('Should update an order', async () => {
    const initialOrder = await orderRepository.create(
      new Order({
        name: 'Guilherme',
        address: 'Jd Florida',
        status: 'A caminho',
      }),
    );

    const user: UserAuthAccess = {
      id: randomUUID(),
      name: 'admin',
      email: 'admin@example.com',
      password: '1234',
      role: [Roles.Admin],
    };
    const updatedOrderResponse = await updateOrder.execute(
      initialOrder.id,
      {
        name: 'New Name',
        address: 'New Address',
        status: 'Entregue',
      },
      user,
    );

    expect(updatedOrderResponse.order).toBeDefined();
    expect(updatedOrderResponse.order.id).toEqual(initialOrder.id);
    expect(updatedOrderResponse.order.name).toEqual('New Name');
    expect(updatedOrderResponse.order.address).toEqual('New Address');
    expect(updatedOrderResponse.order.status).toEqual('Entregue');
  });

  it('Should throw HttpException - 400 for invalid status', async () => {
    const initialOrder = await orderRepository.create(
      new Order({
        name: 'Guilherme',
        address: 'Jd Florida',
        status: 'A caminho',
      }),
    );

    const user: UserAuthAccess = {
      id: randomUUID(),
      name: 'admin',
      email: 'admin@example.com',
      password: '1234',
      role: [Roles.Admin],
    };

    try {
      await updateOrder.execute(
        initialOrder.id,
        {
          name: 'New Name',
          address: 'New Address',
          status: 'A caminho',
        },
        user,
      );
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorHttp);
      expect(error).toEqual(400);
      expect(error).toEqual('Status is not valid');
    }
  });

  it('Should throw HttpException - 403 for non-admin user', async () => {
    const initialOrder = await orderRepository.create(
      new Order({
        name: 'Guilherme',
        address: 'Jd Florida',
        status: 'A caminho',
      }),
    );

    const user: UserAuthAccess = {
      id: randomUUID(),
      name: 'regularUser',
      email: 'user@example.com',
      password: '1234',
      role: [Roles.Admin],
    };

    try {
      await updateOrder.execute(
        initialOrder.id,
        {
          name: 'New Name',
          address: 'New Address',
          status: 'Entregue',
        },
        user,
      );
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorHttp);
      expect(error).toEqual(403);
      expect(error).toEqual('Not permission');
    }
  });
});
