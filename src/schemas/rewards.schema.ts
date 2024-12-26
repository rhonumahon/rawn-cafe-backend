// src/schemas/reward.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Reward extends Document {
  @Prop({ required: true })
  reward_name: string;

  @Prop({ required: true })
  reward_description: string;

  @Prop({ required: true })
  required_points: number;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
