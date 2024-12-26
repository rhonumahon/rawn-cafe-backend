// src/schemas/user.schema.ts

import { Schema, Document } from 'mongoose';

export interface User extends Document {
  name: string;
  contact_number: string;
  card_number: number;
  card_type: 'silver' | 'gold' | 'platinum';
  card_start_date: Date;
  card_expiration_date: Date;
  is_active: boolean;
  points: number;
  rewards: string[]; // Array of redeemed reward IDs
  redeem_requests: string[]; // Array of requested reward IDs before redemption
}

export const UserSchema = new Schema({
  name: { type: String, required: true },
  contact_number: { type: String, required: true },
  card_number: { type: Number, required: true, unique: true },
  card_type: {
    type: String,
    enum: ['silver', 'gold', 'platinum'],
    required: true,
  },
  card_start_date: { type: Date, default: Date.now },
  card_expiration_date: { type: Date, required: true },
  is_active: { type: Boolean, default: true },
  points: { type: Number, default: 0 },
  rewards: { type: [String], default: [] }, // Initialize the rewards array
  redeem_requests: { type: [String], default: [] }, // Initialize the redeem_requests array
});

// Middleware to automatically set the expiration date to 2 years after card start date
UserSchema.pre('save', function (next) {
  if (this.card_start_date) {
    this.card_expiration_date = new Date(this.card_start_date);
    this.card_expiration_date.setFullYear(
      this.card_expiration_date.getFullYear() + 2,
    );
  }
  next();
});
