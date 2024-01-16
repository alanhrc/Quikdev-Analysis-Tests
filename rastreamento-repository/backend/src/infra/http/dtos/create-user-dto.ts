import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

import { Roles } from '@domain/users/entities/roles.enum';
import { passwordValidate } from '@helpers/passwordValidate';

export class UserBodyCreate {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsNotEmpty()
  role: Roles[];

  @IsNotEmpty()
  @Matches(passwordValidate.password)
  password: string;
}
