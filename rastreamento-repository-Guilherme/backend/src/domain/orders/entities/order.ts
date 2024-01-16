import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';

export interface OrderProps {
  createdAt?: Date;
  name: string;
  address: string;
  status:
  | 'Em separacao'
  | 'Entregue a transportadora'
  | 'A caminho'
  | 'Rota de entrega'
  | 'Entregue';
  updatedAt?: Date;
}

export class Order {
  private _id: string;
  private props: OrderProps;

  constructor(props: Replace<OrderProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get id(): string {
    return this._id;
  }

  get address(): string {
    return this.props.address;
  }

  set address(address: string) {
    this.props.address = address;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  set status(
    status:
      | 'Em separacao'
      | 'Entregue a transportadora'
      | 'A caminho'
      | 'Rota de entrega'
      | 'Entregue',
  ) {
    this.props.status = status;
  }

  get status() {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
