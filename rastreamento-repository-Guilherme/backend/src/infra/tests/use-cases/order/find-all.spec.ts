import { FindAllOrder } from '@domain/orders/use-cases/find-all';
import { InMemoryOrderRepository } from '@infra/tests/inMemory/order-inmemory';
import { MockOrder } from '@infra/tests/mocks/order-mock';

describe('Find all Orders', () => {
  const orderRepository = new InMemoryOrderRepository();

  it('Should return orders', async () => {
    const findAllOrders = new FindAllOrder(orderRepository);

    await orderRepository.create(
      MockOrder('Delliv', 'rua sao paulo', 'Em separacao'),
    );

    await orderRepository.create(
      MockOrder('Guilherme', 'rua jd florida', 'Entregue'),
    );

    const { orders } = await findAllOrders.execute();

    expect(orders).toHaveLength(2);
  });
});
