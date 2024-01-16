import { JwtGuard } from '@auth/jwt.guard';
import { HasRoles } from '@auth/rolesGuard/roles.decorator';
import { RolesGuard } from '@auth/rolesGuard/roles.guard';
import { CreateUser } from '@domain/users/use-cases/create-user';
import { FindOne } from '@domain/users/use-cases/find-one';
import { RemoverUser } from '@domain/users/use-cases/remove-user';
import { UpdateUser } from '@domain/users/use-cases/update-user';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserBodyCreate } from '../dtos/create-user-dto';
import { UserAuthAccess } from '@auth/passportEstrategy/jwt.passport';
import { UserModel } from '../models/user-model';
import { Roles } from '@domain/users/entities/roles.enum';
import { UserBodyUpdate } from '../dtos/update-user-dto';

@Controller('user')
export class UserController {
  constructor(
    private createUser: CreateUser,
    private findOne: FindOne,
    private updateUser: UpdateUser,
    private removeUser: RemoverUser,
  ) {}

  @Post('new')
  @UseGuards(JwtGuard, RolesGuard)
  @HasRoles(Roles.Admin, Roles.Coordinator)
  async create(
    @Body() body: UserBodyCreate,
    @Req() request: { user: UserAuthAccess },
  ) {
    const { name, email, password, role } = body;

    const response = await this.createUser.execute(
      {
        name,
        email,
        password,
        role,
      },
      request.user,
    );

    if (!response) {
      return response;
    }

    return { user: UserModel.toHttp(response.user) };
  }

  @Get('search/:idOrEmail')
  @UseGuards(JwtGuard)
  async search(@Param('idOrEmail') idOrEmail: string) {
    try {
      const isEmail = idOrEmail.includes('@');
      const args = isEmail ? { email: idOrEmail } : { id: idOrEmail };

      const response = await this.findOne.execute(args);

      if (!response) {
        return { user: null };
      }

      return { user: response };
    } catch (error) {
      return { user: null };
    }
  }

  @Delete('delete/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @HasRoles(Roles.Admin)
  async delete(@Param('id') id: string) {
    return await this.removeUser.execute(id);
  }

  @Put('update/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @HasRoles(Roles.Admin)
  async update(
    @Param('id') id: string,
    @Body() body: UserBodyUpdate,
    @Req() request: { user: UserAuthAccess },
  ) {
    const { name, email, password, role } = body;

    const { user } = await this.updateUser.execute(
      id,
      { name, email, password, role },
      request.user,
    );

    return { user: UserModel.toHttp(user) };
  }
}
