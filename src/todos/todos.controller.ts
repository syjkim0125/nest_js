import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TodosService} from './todos.service';
import { Todo } from './entity/todo.entity';
import { TodoDTO } from './dto/todo.dto';
import { TodoRO } from './ro/todo.ro';

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
  create(@Body() todo: TodoDTO): Promise<TodoRO> {
    return this.todosService.create(todo);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<TodoRO> {
    return this.todosService.delete(id);
  }

  @Put(':id')
  update(@Body() updateTodo: Partial<TodoDTO>, @Param('id') id): Promise<TodoRO> {
    return this.todosService.update(id, updateTodo);
  }
}
