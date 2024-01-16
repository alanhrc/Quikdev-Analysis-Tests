import { CreateOrder } from '@domain/orders/use-cases/create-order';
import { Roles } from '@domain/users/entities/roles.enum';

import { InMemoryOrderRepository } from '@infra/tests/inMemory/order-inmemory';
import { randomUUID } from 'crypto';

describe('Create order', () => {
  const orderRepository = new InMemoryOrderRepository();
  const createOrder = new CreateOrder(orderRepository);

  afterEach(() => {
    orderRepository.order = [];
  });

  it('Should create a new Order', async () => {
    const order = await createOrder.execute(
      {
        name: 'Guilherme',
        address: 'Jd Florida',
        status: 'A caminho',
      },
      {
        id: randomUUID(),
        name: 'admin',
        email: 'admin@example.com',
        password: '1234',
        role: [Roles.Admin],
      },
    );

    expect(orderRepository.order).toHaveLength(1);
    expect(orderRepository.order[0]).toEqual(order.order);
  });
});
