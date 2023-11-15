import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly TodoService: TodoService) {}

  @Post()
  async create(@Body() createDailyTodoDto: TodoDto) {
    return this.TodoService.create(createTodoDto);
  }

  @Get()
  async findAll() {
    return this.TodoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.TodoService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: TodoDto) {
    return this.TodoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.TodoService.remove(id);
  }
}
