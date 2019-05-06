import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entity/todo.entity';
import { TodosRO } from './ro/todo.ro';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private readonly todoRepository:Repository<Todo>) {}

  private toResponseObject(message: string, todo: Todo): TodosRO {
    return { message: message, todo: todo };
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    return await this.todoRepository.findOne({ id: id });
  }

  async create(todo: Todo): Promise<TodosRO> {
    const message = "created";
    const newTodo = await this.todoRepository.create(todo);
    await this.todoRepository.save(newTodo);
    return this.toResponseObject(message, newTodo);
  }

  async delete(id: number): Promise<Todo> {
    try {
      const deleteTodo = await this.todoRepository.findOne(id);
      await this.todoRepository.remove(deleteTodo);
      return deleteTodo;
    } catch(err){
      console.log(err.message);
      return err.message;
    }
  }

  async update(id: string, todo: Todo): Promise<Todo> {
    await this.todoRepository.update(id, todo);
    return await this.todoRepository.findOne(id);
  }
}
