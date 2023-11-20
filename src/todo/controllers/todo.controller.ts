import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { parseISO } from 'date-fns';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get('byDate')
  findTodosByDate(@Query('date') dateString: string, @Query('user') userName: string) {
    const date = parseISO(dateString);
    return this.todoService.findTodosByDate(date, userName);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('user') userName: string) {
    return this.todoService.findOne(id, userName);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: CreateTodoDto, @Body('user') userName: string) {
    return this.todoService.update(id, updateTodoDto, userName);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Query('user') userName: string) {
    return this.todoService.remove(id, userName);
  }

  @Get('user/:userName')
  findAllByUser(@Param('userName') userName: string) {
    return this.todoService.findAllByUser(userName);
  }
}
