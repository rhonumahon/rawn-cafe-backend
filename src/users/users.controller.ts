// src/users/users.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Register a user without specifying card type, as it will be calculated based on points
  @Post('register')
  async registerUser(
    @Body('name') name: string,
    @Body('contact_number') contact_number: string,
  ) {
    return this.usersService.registerUser(name, contact_number);
  }

  // Automatically increment user points and update card type
  @Post('update-points')
  async updateUserPoints(@Body('userId') userId: string) {
    return this.usersService.updateUserPoints(userId);
  }
}
