import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { TodoService } from '../todo/services/todo.services';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Todo } from '../todo/modules/todo.module';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as readline from 'readline';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const todoModel = app.get<Model<Todo>>(getModelToken(Todo.name));
  const todoService = app.get<TodoService>(TodoService);

  if (process.env.NODE_ENV === 'development') {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Are you sure you want to clear all data and re-seed? (yes/no) ', async (answer) => {
      if (answer.toLowerCase() === 'yes') {
        await todoModel.deleteMany({});

        // Seed user
        // Assuming you have a UserService to handle user creation
        // const userService = app.get<UserService>(UserService);
        // const kevin: CreateUserDto = { name: 'Kevin', productivityLevel: 'Motivated' };
        // const kevinUser = await userService.create(kevin);

        // Seed todos
        const seedTodos: CreateTodoDto[] = [
          { title: 'Decorate Christmas Tree', repeat: 'Never', /* other properties, user: kevinUser */ },
          { title: 'Clean kitchen', repeat: 'Daily - Weekends', /* other properties, user: kevinUser */ },
          // ... other todos
        ];

        for (const todoData of seedTodos) {
          await todoService.create(todoData);
        }
      }

      rl.close();
      await app.close();
    });
  } else {
    console.log('Seed script is running in non-development environment. Exiting...');
    await app.close();
  }
}

seed();
