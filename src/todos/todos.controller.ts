import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TodosService} from './todos.service';
import { Todo } from './entity/todo.entity';

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
  create(@Body() todo: Todo): Promise<Todo> {
    return this.todosService.create(todo);
  }

  // @Delete(':id')
  // delete(@Param('id') id): Promise<Todo> {
  //   return this.todosService.delete(id);
  // }
  //
  // @Put(':id')
  // update(@Body() updateTodoDto: CreateTodoDto, @Param('id') id): Promise<Todo> {
  //   return this.todosService.update(id, updateTodoDto);
  // }
}
