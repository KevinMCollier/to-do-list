import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { getModelToken } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Todo } from '../models/todo.model';
import { CreateTodoDto } from '../dto/create-todo.dto';

describe('TodoService', () => {
  let service: TodoService;
  let model: any;

  const mockTodo = {
    _id: new mongoose.Types.ObjectId(),
    title: 'Test Todo',
    repeat: 'Never',
    date: new Date(),
    user: new mongoose.Types.ObjectId().toString(),
    save: jest.fn().mockResolvedValue(this),
  };

  const mockModel = {
    create: jest.fn().mockResolvedValue(mockTodo),
    find: jest.fn(),
    // Add other methods as needed
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getModelToken('Todo'),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    model = module.get(getModelToken('Todo'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a todo with "Never" repeat status', async () => {
    const mockCreateTodoDto: CreateTodoDto = {
      title: 'Test Todo',
      repeat: 'Never',
      date: new Date(),
      user: new mongoose.Types.ObjectId().toString(),
    };

    jest.spyOn(model, 'create').mockResolvedValueOnce(mockTodo);

    const result = await service.create(mockCreateTodoDto as any);
    expect(result).toEqual(mockTodo);
    expect(model.create).toHaveBeenCalledWith(mockCreateTodoDto);
  });

  // Add other tests here
});
