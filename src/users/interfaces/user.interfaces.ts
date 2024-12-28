// src/users/interfaces/user.interfaces.ts

import { Document, Schema } from 'mongoose';

export interface User extends Document {
  name: string;
  contact_number: string;
  card_number: string;
  card_type: string;
  card_expiration_date: string;
}

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  contact_number: { type: String, required: true },
  card_number: { type: String, required: true },
  card_type: { type: String, required: true },
  card_expiration_date: { type: String, required: true },
});

export default UserSchema;
