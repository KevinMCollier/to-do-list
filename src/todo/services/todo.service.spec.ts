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
    date: new Date('2023-01-01'),
    user: new mongoose.Types.ObjectId().toString(),
    save: jest.fn().mockResolvedValue(this),
  };

  const mockModel = {
    create: jest.fn().mockResolvedValue(mockTodo),
    find: jest.fn().mockReturnValue({
      exec: jest.fn(),
    }),
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

    // Mock the behavior of exec for different test cases
    mockModel.find().exec
      .mockResolvedValueOnce([mockTodo]) // Mock return value for the first call
      .mockResolvedValueOnce([]); // Mock return value for the second call
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

  it('should return Todo with "Never" repeat status if current date matches Todo date', async () => {
    const currentDate = new Date('2023-01-01');

    const result = await service.findTodosByDate(currentDate);
    expect(result).toContainEqual(mockTodo);
    expect(result.length).toBe(1);
  });

  it('should not return Todo with "Never" repeat status if current date does not match Todo date', async () => {
    const currentDate = new Date('2023-01-02'); // different date

    const result = await service.findTodosByDate(currentDate);
    expect(result).toEqual([]);
  });
});
