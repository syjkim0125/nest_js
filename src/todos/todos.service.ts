import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entity/todo.entity';
import { TodoRO } from './ro/todo.ro';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private readonly todoRepository:Repository<Todo>) {}

  private toResponseObject(message: string, todo?: Todo): TodosRO {
    return { message: message, todo: todo };
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    return await this.todoRepository.findOne({ id: id });
  }

  async create(todo: Todo): Promise<TodoRO> {
    const message = "created";
    let newTodo = await this.todoRepository.create(todo);
    await this.todoRepository.save(newTodo);
    newTodo = await this.todoRepository.findOne(newTodo.id);
    return this.toResponseObject(message, newTodo);
  }

  async delete(id: number): Promise<TodoRO> {
    try {
      const message = "deleted";
      const deleteTodo = await this.todoRepository.findOne(id);
      await this.todoRepository.remove(deleteTodo);
      return this.toResponseObject(message);
    } catch(err){
      console.log(err.message);
      return err.message;
    }
  }

  async update(id: string, todo: Todo): Promise<TodoRO> {
    const message = "updated";
    await this.todoRepository.update(id, todo);
    const updateTodo = await this.todoRepository.findOne(id);
    return this.toResponseObject(message, updateTodo);
  }
}
