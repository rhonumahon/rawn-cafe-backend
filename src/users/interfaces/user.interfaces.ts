// src/users/interfaces/user.interfaces.ts

import { Document } from 'mongoose';

export interface User extends Document {
  readonly name: string;
  readonly contact_number: string;
  readonly card_number: number;
  readonly createdAt: Date;
}
