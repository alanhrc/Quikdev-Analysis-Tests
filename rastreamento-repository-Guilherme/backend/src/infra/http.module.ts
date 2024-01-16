import { Module } from '@nestjs/common';
import { Database } from './database/database.module';
import { UserController } from './http/controllers/user-controller';
import { CreateUser } from '@domain/users/use-cases/create-user';
import { UpdateUser } from '@domain/users/use-cases/update-user';
import { RemoverUser } from '@domain/users/use-cases/remove-user';
import { FindOne } from '@domain/users/use-cases/find-one';
import { CreateOrder } from '@domain/orders/use-cases/create-order';
import { UpdateOrder } from '@domain/orders/use-cases/update-order';
import { FindAllOrder } from '@domain/orders/use-cases/find-all';
import { FindOneOrder } from '@domain/orders/use-cases/find-one';
import { AuthController } from '@auth/controllers/auth.controller';
import { JwtGuard } from '@auth/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '@auth/passportEstrategy/local.passport';
import { ConfigModule } from '@nestjs/config';
import { Auth } from '@auth/service/auth';
import { PassportModule } from '@nestjs/passport';
import { JwtPassport } from '@auth/passportEstrategy/jwt.passport';
import { OrderController } from './http/controllers/order-controller';
@Module({
  imports: [
    Database,
    ConfigModule.forRoot(),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [OrderController, UserController, AuthController],
  providers: [
    JwtPassport,
    JwtGuard,
    CreateOrder,
    UpdateOrder,
    FindAllOrder,
    FindOneOrder,
    CreateUser,
    UpdateUser,
    RemoverUser,
    FindOne,
    LocalStrategy,
    Auth,
  ],
})
export class HttpModule {}