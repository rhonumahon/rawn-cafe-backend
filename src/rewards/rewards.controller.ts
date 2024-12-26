// src/rewards/rewards.controller.ts

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RewardsService } from './rewards.service';

@Controller('rewards')
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  // Create a new reward
  @Post('create')
  async createReward(
    @Body('reward_name') reward_name: string,
    @Body('reward_description') reward_description: string,
    @Body('required_points') required_points: number,
  ) {
    return this.rewardsService.createReward(
      reward_name,
      reward_description,
      required_points,
    );
  }

  // Get all rewards
  @Get()
  async getAllRewards() {
    return this.rewardsService.getAllRewards();
  }

  // Get a specific reward by ID
  @Get(':id')
  async getRewardById(@Param('id') id: string) {
    return this.rewardsService.getRewardById(id);
  }

  // Redeem a reward (the user must have enough points)
  @Post(':id/redeem')
  async redeemReward(
    @Param('id') rewardId: string,
    @Body('userId') userId: string,
    @Body('userPoints') userPoints: number,
  ) {
    return this.rewardsService.redeemReward(userId, rewardId, userPoints);
  }
}
