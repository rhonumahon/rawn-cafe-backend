// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CounterService } from '../counter/counter.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private counterService: CounterService, // Injecting CounterService to get the next card number
  ) {}

  // Determine the card type based on points
  private determineCardType(points: number): 'silver' | 'gold' | 'platinum' {
    if (points < 20) {
      return 'silver';
    } else if (points >= 20 && points <= 49) {
      return 'gold';
    } else {
      return 'platinum';
    }
  }

  // Register a user and assign initial points (default: 0)
  async registerUser(name: string, contact_number: string) {
    // Get the next card number from the counter service
    const card_number = await this.counterService.getNextCardNumber();

    // Set the default points to 0 when the user is registered
    const points = 0;

    // Determine the card type based on the points
    const card_type = this.determineCardType(points);

    // Set the card expiration date (2 years from now)
    const card_start_date = new Date();
    const card_expiration_date = new Date(card_start_date);
    card_expiration_date.setFullYear(card_expiration_date.getFullYear() + 2);

    // Create a new user
    const newUser = new this.userModel({
      name,
      contact_number,
      card_number,
      card_type,
      points,
      card_start_date,
      card_expiration_date,
      is_active: true,
    });

    // Save the user and return the created user
    return newUser.save();
  }

  // Automatically increment the user's points and recalculate card type
  async updateUserPoints(userId: string) {
    // Find the user
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Increment the user's points by 1 (or any other value you prefer)
    user.points += 1;

    // Recalculate the card type based on the new points
    user.card_type = this.determineCardType(user.points);

    // Save the updated user
    return user.save();
  }
}
