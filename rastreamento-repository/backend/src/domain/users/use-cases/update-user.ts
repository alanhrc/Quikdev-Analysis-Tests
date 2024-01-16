import { UserAuthAccess } from '@auth/passportEstrategy/jwt.passport';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repositories';
import { IUpdateUser } from './interface/update-interface';
import { Roles } from '../entities/roles.enum';
import { User } from '../entities/user';
import ErrorHttp from '@helpers/Errorhttp';
import { hashSync } from 'bcrypt';

@Injectable()
export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    id: string,
    { name, email, role, password }: IUpdateUser,
    user: UserAuthAccess,
  ) {
    const checkUser = await this.userRepository.findOne({ id });

    if (!checkUser) {
      throw ErrorHttp(404, 'Not found');
    }

    if (
      user.role &&
      user.role.length > 0 &&
      user.role[0] === Roles.Admin &&
      role[0] !== Roles.Common
    ) {
      throw ErrorHttp(401, 'Do not have permission to create this user');
    }

    const updatedRole = role && role.length > 0 ? role : checkUser.role;

    const encryptPassword = password
      ? hashSync(password, 10)
      : checkUser.password;

    const updatedUser = new User(
      {
        name,
        email,
        role: updatedRole,
        password: encryptPassword,
      },
      id,
    );

    return {
      user: await this.userRepository.update(id, updatedUser),
    };
  }
}
