// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserModel, UserSchema } from './models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    // ... other imports ...
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
