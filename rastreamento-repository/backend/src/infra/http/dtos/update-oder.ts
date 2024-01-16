import { IsOptional } from 'class-validator';

export class OrderBodyUpdate {
  @IsOptional()
  name: string;

  @IsOptional()
  address: string;

  @IsOptional()
  status:
    | 'Em separacao'
    | 'Entregue a transportadora'
    | 'A caminho'
    | 'Rota de entrega'
    | 'Entregue';
}
