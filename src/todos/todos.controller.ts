import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, Logger } from '@nestjs/common';
import { TodosService} from './todos.service';
import { Todo } from './entity/todo.entity';
import { TodoDTO } from './dto/todo.dto';
import { TodoRO } from './ro/todo.ro';
import { ValidationPipe } from '../../src/share/validation.pipe';
import { stringify } from 'querystring';

@Controller('todos')
export class TodosController {
  private logger = new Logger('TodosController');

  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Todo> {
    return this.todosService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() todo: TodoDTO): Promise<TodoRO> {
    this.logger.log(JSON.stringify(todo));
    return this.todosService.create(todo);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<TodoRO> {
    return this.todosService.delete(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: number, @Body() updateTodo: Partial<TodoDTO>): Promise<TodoRO> {
    this.logger.log(JSON.stringify(updateTodo));
    return this.todosService.update(id, updateTodo);
  }
}
