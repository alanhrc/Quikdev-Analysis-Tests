import { hashSync } from 'bcrypt';
import { Roles } from '../entities/roles.enum';
import { User } from '../entities/user';
import { UserRepository } from '../repositories/user-repositories';
import { Injectable } from '@nestjs/common';
import ErrorHttp from '@helpers/Errorhttp';
import { UserAuthAccess } from '@auth/passportEstrategy/jwt.passport';

export interface newUserCreate {
  name: string;
  role: Roles[];
  email: string;
  password: string;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(
    { name, role, email, password }: newUserCreate,
    user: UserAuthAccess,
  ) {
    if (!user || !user.role || user.role.indexOf(Roles.Admin) === -1) {
      throw ErrorHttp(403, 'Not permission');
    }

    const checkingUser = await this.userRepository.findOne({ email });

    if (checkingUser) {
      throw ErrorHttp(409, 'User with this email already exists');
    }

    const encryptPassword = hashSync(password, 10);

    const newUser = new User({
      name,
      email,
      role,
      password: encryptPassword,
    });

    const response = await this.userRepository.create(newUser);

    if (response) {
      return { user: newUser };
    }

    return null;
  }
}
