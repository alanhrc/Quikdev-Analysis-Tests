import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { PostService } from '../post/post.service';
import featureDB from '../../db/feature.db';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService, PostService],
  imports: [MongooseModule.forFeature(featureDB)],
  exports: [UserService],
})
export class UserModule {}
