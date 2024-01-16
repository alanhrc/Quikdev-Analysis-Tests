import { JwtGuard } from '@auth/jwt.guard';
import { CreateOrder } from '@domain/orders/use-cases/create-order';
import { FindAllOrder } from '@domain/orders/use-cases/find-all';
import { FindOneOrder } from '@domain/orders/use-cases/find-one';
import { UpdateOrder } from '@domain/orders/use-cases/update-order';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderBodyCreate } from '../dtos/create-order';
import { OrderBodyUpdate } from '../dtos/update-oder';
import { OrderMOdel } from '../models/order-model';
import { HasRoles } from '@auth/rolesGuard/roles.decorator';
import { Roles } from '@domain/users/entities/roles.enum';
import { UserAuthAccess } from '@auth/passportEstrategy/jwt.passport';

@Controller('order')
export class OrderController {
  constructor(
    private createOrder: CreateOrder,
    private updateOrder: UpdateOrder,
    private findOne: FindOneOrder,
    private findAll: FindAllOrder,
  ) { }

  @Post('new')
  @UseGuards(JwtGuard)
  async create(
    @Body() body: OrderBodyCreate,
    @Req() request: { user: UserAuthAccess },
  ) {
    const { name, address, status } = body;
    const response = await this.createOrder.execute(
      {
        name,
        address,
        status,
      },
      request.user,
    );

    if (!response) {
      return response;
    }

    return { order: OrderMOdel.toHttp(response.order) };
  }

  @Put('update/:id')
  @UseGuards(JwtGuard)
  @HasRoles(Roles.Admin)
  async update(
    @Param('id') id: string,
    @Body() body: OrderBodyUpdate,
    @Req() request: { user: UserAuthAccess },
  ) {
    const { name, address, status } = body;

    const { order } = await this.updateOrder.execute(
      id,
      {
        name,
        address,
        status,
      },
      request.user,
    );

    return { order: OrderMOdel.toHttp(order) };
  }

  @Get('search/:id')
  @UseGuards(JwtGuard)
  async search(@Param('id') id: object) {
    const response = await this.findOne.execute(id);
    return {
      order: OrderMOdel.toHttp(response),
    };
  }

  @Get('all')
  @UseGuards(JwtGuard)
  async findAllOrder() {
    const response = await this.findAll.execute();

    return {
      order: response.orders.map((order) => OrderMOdel.toHttp(order)),
    };
  }
}
