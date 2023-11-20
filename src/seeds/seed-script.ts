import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { TodoService } from '../todo/services/todo.service';
// import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Todo } from '../todo/models/todo.model';  // Adjust the path to your Todo schema
import { TodoModel } from '../todo/models/todo.model';  // Adjust the path to your Todo schema
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateTodoDto } from '../todo/dto/create-todo.dto'; // Adjust the path to your CreateTodoDto
import * as readline from 'readline';
import { UserService } from '../user/services/user.service'; // Adjust the path to your UserService

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const todoModel = app.get<Model<Todo>>(getModelToken(TodoModel.name));
  const todoService = app.get<TodoService>(TodoService);
  const userService = app.get<UserService>(UserService);

  if (process.env.NODE_ENV === 'development') {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Are you sure you want to clear all data and re-seed? (yes/no) ', async (answer) => {
      if (answer.toLowerCase() === 'yes') {
        await todoModel.deleteMany({});

        // Seed user
        const kevin: CreateUserDto = { name: 'Kevin', email: 'kevin@example.com', productivityLevel: 'Motivated' };
        const kevinUser = await userService.create(kevin);

        // Seed todos
        const seedTodos: CreateTodoDto[] = [
          { title: 'Decorate Christmas Tree', repeat: 'Never', date: new Date('2023-12-24'), user: kevinUser.id },
          { title: 'Clean kitchen', repeat: 'Daily - Weekends', date: new Date('2023-12-01'), user: kevinUser.id },
          { title: 'Buy Christmas gifts', repeat: 'Never', date: new Date('2023-12-20'), user: kevinUser.id },
          { title: 'Wrap Christmas presents', repeat: 'Never', date: new Date('2023-12-22'), user: kevinUser.id },
          { title: 'Plan Christmas dinner', repeat: 'Never', date: new Date('2023-12-23'), user: kevinUser.id },
          { title: 'Bake Christmas cookies', repeat: 'Daily', date: new Date('2023-12-15'), user: kevinUser.id },
          { title: 'Prepare Christmas cards', repeat: 'Never', date: new Date('2023-12-10'), user: kevinUser.id },
          { title: 'Visit a Christmas market', repeat: 'Never', date: new Date('2023-12-05'), user: kevinUser.id },
          { title: 'Organize Christmas party', repeat: 'Never', date: new Date('2023-12-18'), user: kevinUser.id },
          { title: 'Attend Christmas service', repeat: 'Never', date: new Date('2023-12-25'), user: kevinUser.id },
          { title: 'Create a Christmas playlist', repeat: 'Never', date: new Date('2023-12-07'), user: kevinUser.id },
          { title: 'Go Christmas shopping', repeat: 'Daily', date: new Date('2023-12-12'), user: kevinUser.id },
          // ... other todos with dates and user reference
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
