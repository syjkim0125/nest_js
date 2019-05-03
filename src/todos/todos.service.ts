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

  // async findOne(id: number): Promise<Todo> {
  //   return await this.todoRepository.findOne({ id: id });
  // }

  // async create(todo: Todo): Promise<Todo> {
  //   const newTodo = new this.todoRepository(todo);
  //   return await newTodo.save();
  // }

  // async delete(id: string): Promise<Todo> {
  //   return await this.todoRepository.findByIdAndRemove(id);
  // }
  //
  // async update(id: string, todo: Todo): Promise<Todo> {
  //   return await this.todoRepository.findByIdAndUpdate(id, todo, { new:true });
  // }
}
