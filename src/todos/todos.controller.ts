import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodosService} from './todos.service';
import { Todo } from './interfaces/todo.interface';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Todo> {
    return this.todosService.findOne(id);
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Todo> {
    return this.todosService.delete(id);
  }

  @Put(':id')
  update(@Body() updateTodoDto: CreateTodoDto, @Param('id') id): Promise<Todo> {
    return this.todosService.update(id, updateTodoDto);
  }
}
