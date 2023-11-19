// src/todo/todo.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo.service';
import { TodoSchema } from './models/todo.model';
import { UserModule } from '../user/user.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }]),
    UserModule,
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
