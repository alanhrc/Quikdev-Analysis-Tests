import { IsNotEmpty } from 'class-validator';

export class OrderBodyCreate {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  status:
    | 'Em separacao'
    | 'Entregue a transportadora'
    | 'A caminho'
    | 'Rota de entrega'
    | 'Entregue';
}
