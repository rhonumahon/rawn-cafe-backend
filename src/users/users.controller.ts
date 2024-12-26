// src/users/users.controller.ts

import {
  Body,
  Controller,
  Post,
  Param,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(
    @Body('name') name: string,
    @Body('contact_number') contact_number: string,
  ) {
    return this.usersService.registerUser(name, contact_number);
  }

  // Get all users with selected fields
  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // Register a user without specifying card type
  @Get(':id')
  async getUserById(@Param('id') userId: string) {
    try {
      const user = await this.usersService.getUserById(userId);
      return user;
    } catch (error) {
      throw new NotFoundException(error.message); // If user is not found, throw a 404 error
    }
  }

  @Post('update-points')
  async updateUserPoints(@Body('userId') userId: string) {
    return this.usersService.updateUserPoints(userId);
  }

  // Redeem a reward for a user
  @Post(':user_id/redeem/:reward_id')
  async redeemReward(
    @Param('user_id') userId: string,
    @Param('reward_id') rewardId: string,
  ) {
    return this.usersService.redeemReward(userId, rewardId);
  }
}
