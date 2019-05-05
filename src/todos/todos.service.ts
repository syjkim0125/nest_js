import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private readonly todoRepository:Repository<Todo>) {}

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    return await this.todoRepository.findOne({ id: id });
  }

  async create(todo: Todo): Promise<Todo> {
    const newTodo = await this.todoRepository.create(todo);
    await this.todoRepository.save(newTodo);
    return newTodo;
  }

  async delete(id: number): Promise<Todo> {
    const deleteTodo = await this.todoRepository.findOne(id);
    await this.todoRepository.remove(deleteTodo);
    return deleteTodo;
  }

  async update(id: string, todo: Todo): Promise<Todo> {
    await this.todoRepository.update(id, todo);
    return await this.todoRepository.findOne(id);
  }
}
