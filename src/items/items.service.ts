import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel:Model<Item>) {}

  findAll(): Promise<Item[]> {
    return this.itemModel.find();
  }

  findOne(id: string): Promise<Item> {
    return this.itemModel.findOne({ _id: id });
  }

  create(item: Item): Promise<Item> {
    const newItem = new this.itemModel(item);
    return newItem.save();
  }
}
