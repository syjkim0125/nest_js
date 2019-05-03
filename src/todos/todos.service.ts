import { Injectable } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TodosService {
  constructor(@InjectModel('Todo') private readonly todoModel:Model<Todo>) {}

  async findAll(): Promise<Todo[]> {
    return await this.todoModel.find();
  }

  async findOne(id: string): Promise<Todo> {
    return await this.todoModel.findOne({ _id: id });
  }

  async create(todo: Todo): Promise<Todo> {
    const newTodo = new this.todoModel(todo);
    return await newTodo.save();
  }

  async delete(id: string): Promise<Todo> {
    return await this.todoModel.findByIdAndRemove(id);
  }

  async update(id: string, todo: Todo): Promise<Todo> {
    return await this.todoModel.findByIdAndUpdate(id, todo, { new:true });
  }
}
