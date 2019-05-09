import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entity/todo.entity';
import { TodoDTO } from './dto/todo.dto';
import { TodoRO } from './ro/todo.ro';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private readonly todoRepository:Repository<Todo>) {}

  private toResponseObject(message: string, todo?: Todo): TodoRO {
    return { message: message, todo: todo };
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne(id);

    if(!todo) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return todo;
  }

  async create(todo: TodoDTO): Promise<TodoRO> {
    const message = "created";
    let newTodo = await this.todoRepository.create(todo);
    await this.todoRepository.save(newTodo);
    newTodo = await this.todoRepository.findOne(newTodo.id);

    return this.toResponseObject(message, newTodo);
  }

  async delete(id: number): Promise<TodoRO> {
    const deleteTodo = await this.todoRepository.findOne(id);
    
    if(!deleteTodo) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    
    const message = "deleted";
    await this.todoRepository.remove(deleteTodo);
    return this.toResponseObject(message);  
  }

  async update(id: number, todo: Partial<TodoDTO>): Promise<TodoRO> {
    const checktodo = await this.todoRepository.findOne(id);
    
    if(!checktodo) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const message = "updated";
    await this.todoRepository.update(id, todo);
    const updateTodo = await this.todoRepository.findOne(id);

    return this.toResponseObject(message, updateTodo);
  }
}
