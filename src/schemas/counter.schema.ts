// src/schemas/counter.schema.ts

import { Schema, Document } from 'mongoose';

export interface Counter extends Document {
  name: string; // We will store the name of the counter, in this case "card_number"
  value: number; // The current value of the card number
}

export const CounterSchema = new Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, required: true, default: 1000 }, // Default starts at 1000
});
