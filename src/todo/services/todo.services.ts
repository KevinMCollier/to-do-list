import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { Todo } from '../models/todo.model';
import { format } from 'date-fns';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    if (createTodoDto.repeat === 'Weekly') {
      this.assignDayOfWeek(createTodoDto);
    }
    const todo = new this.todoModel(createTodoDto);
    return todo.save();
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findOne(id: string): Promise<Todo> {
    return this.todoModel.findById(id).exec();
  }

  async update(id: string, updateTodoDto: CreateTodoDto): Promise<Todo> {
    if (updateTodoDto.repeat === 'Weekly') {
      this.assignDayOfWeek(updateTodoDto);
    }
    return this.todoModel.findByIdAndUpdate(id, updateTodoDto, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.todoModel.findByIdAndRemove(id).exec();
  }

  private assignDayOfWeek(todoDto: CreateTodoDto) {
    const formattedDay = format(todoDto.date, 'EEEE');
    const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    if (validDays.includes(formattedDay)) {
      todoDto.dayOfWeek = formattedDay as 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    } else {
      // Handle the error if the day is not valid
      // This could be throwing an exception or handling it another way depending on your application's requirements
      throw new Error('Invalid day of the week.');
    }
  }
}
