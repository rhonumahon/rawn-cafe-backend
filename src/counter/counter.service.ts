// src/users/counter.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counter } from '../schemas/counter.schema';

@Injectable()
export class CounterService {
  constructor(@InjectModel('Counter') private counterModel: Model<Counter>) {}

  async getNextCardNumber(): Promise<number> {
    const counter = await this.counterModel
      .findOneAndUpdate(
        { name: 'card_number' },
        { $inc: { value: 1 } }, // Increment the value by 1
        { new: true, upsert: true }, // If no document exists, create it
      )
      .exec();

    return counter.value;
  }
}
