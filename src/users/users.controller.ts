// src/users/users.controller.ts

import {
  Body,
  Controller,
  Post,
  Param,
  Get,
  NotFoundException,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(
    @Body('name') name: string,
    @Body('contact_number') contact_number: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('email') email?: string,
  ) {
    return this.usersService.registerUser(
      name,
      contact_number,
      username,
      password,
      email,
    );
  }

  // Only accessible by super-admin or admin
  @Get()
  @UseGuards(RolesGuard)
  @Roles('super-admin', 'admin')
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // Accessible by super-admin, admin, or the user themselves
  @Get(':user_id')
  @UseGuards(RolesGuard)
  @Roles('super-admin', 'admin', 'user')
  async getUserById(@Param('user_id') userId: string) {
    try {
      const user = await this.usersService.getUserById(userId);
      return user;
    } catch (error) {
      throw new NotFoundException(error.message); // If user is not found, throw a 404 error
    }
  }

  @Post('update-points')
  @UseGuards(RolesGuard)
  @Roles('super-admin', 'admin')
  async updateUserPoints(@Body('userId') userId: string) {
    return this.usersService.updateUserPoints(userId);
  }

  // Redeem a reward (only users with valid reward requests can redeem)
  @Post(':user_id/redeem/:reward_id')
  async redeemReward(
    @Param('user_id') userId: string,
    @Param('reward_id') rewardId: string,
  ) {
    console.log('userId :', userId);
    return this.usersService.redeemReward(userId, rewardId);
  }

  // Update a user's details
  @Put(':user_id')
  @UseGuards(RolesGuard)
  @Roles('super-admin')
  async updateUser(
    @Param('user_id') userId: string,
    @Body() updateData: Partial<UpdateUserDto>,
  ) {
    try {
      const updatedUser = await this.usersService.updateUser(
        userId,
        updateData,
      );
      return updatedUser;
    } catch (error) {
      throw new NotFoundException(error.message); // If user is not found, throw a 404 error
    }
  }

  // Delete a user
  @Delete(':user_id')
  @UseGuards(RolesGuard)
  @Roles('super-admin')
  async deleteUser(@Param('user_id') userId: string) {
    try {
      await this.usersService.deleteUser(userId);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new NotFoundException(error.message); // If user is not found, throw a 404 error
    }
  }
}
