import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { Todo } from '../models/todo.model';
import { format, isSameDay, isWeekend } from 'date-fns';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    if (createTodoDto.repeat === 'Weekly') {
      this.assignDayOfWeek(createTodoDto);
    }
    return this.todoModel.create(createTodoDto);
  }

  async findTodosByDate(date: Date, userId: string): Promise<Todo[]> {
    const todos = await this.todoModel.find({ user: userId }).exec();
    const filteredTodos = todos.filter(todo => {
      if (todo.repeat === 'Never' && isSameDay(todo.date, date)) {
        return true;
      } else if (todo.date <= date) {
        if (todo.repeat === 'Daily') {
          return true;
        } else if (todo.repeat === 'Daily - Weekdays' && !isWeekend(date)) {
          return true;
        } else if (todo.repeat === 'Daily - Weekends' && isWeekend(date)) {
          return true;
        }
      } else if (todo.repeat === 'Weekly' && todo.dayOfWeek === format(date, 'EEEE')) {
        return true;
      }
      return false;
    });

    return filteredTodos;
  }


  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findOne(id: string, userName: string): Promise<Todo> {
    const todo = await this.todoModel.findOne({ _id: id, 'user.name': userName }).exec();
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found for user ${userName}.`)
    }
    return todo;
  }

  async update(id: string, updateTodoDto: CreateTodoDto, userName: string): Promise<Todo> {
    if (updateTodoDto.repeat === 'Weekly') {
      this.assignDayOfWeek(updateTodoDto);
    }
    const updatedTodo = await this.todoModel.findOneAndUpdate({ _id: id, 'user.name': userName }, updateTodoDto, { new: true }).exec();
    if (!updatedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found for user ${userName}.`)
    }
    return updatedTodo;
  }

  async remove(id: string, userId: string): Promise<void> {
    const result = await this.todoModel.deleteOne({ _id: id, user: userId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found for user ${userId}.`);
    }
  }

  async findAllByUser(userId: string): Promise<Todo[]> {
    return this.todoModel.find({ user: userId }).exec();
  }

  private assignDayOfWeek(todoDto: CreateTodoDto) {
    const formattedDay = format(todoDto.date, 'EEEE');
    const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    if (validDays.includes(formattedDay)) {
      todoDto.dayOfWeek = formattedDay as 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    } else {
      throw new BadRequestException('Invalid day of the week.');
    }
  }

}
