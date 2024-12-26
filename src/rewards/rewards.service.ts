// src/rewards/rewards.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward } from '../schemas/rewards.schema';

@Injectable()
export class RewardsService {
  constructor(@InjectModel(Reward.name) private rewardModel: Model<Reward>) {}

  // Create a new reward
  async createReward(
    reward_name: string,
    reward_description: string,
    required_points: number,
  ) {
    const reward = new this.rewardModel({
      reward_name,
      reward_description,
      required_points,
    });

    return reward.save();
  }

  // Get all rewards
  async getAllRewards() {
    return this.rewardModel.find().exec();
  }

  // Get a specific reward by ID
  async getRewardById(id: string) {
    return this.rewardModel.findById(id).exec();
  }

  // Redeem a reward (the user needs to have enough points)
  async redeemReward(userId: string, rewardId: string, userPoints: number) {
    const reward = await this.rewardModel.findById(rewardId).exec();

    if (!reward) {
      throw new Error('Reward not found');
    }

    if (userPoints < reward.required_points) {
      throw new Error('Not enough points to redeem this reward');
    }

    // Here you can add logic to deduct points from the user's account if they redeem the reward.
    // For now, we will just return a success message
    return { message: `Successfully redeemed ${reward.reward_name}!` };
  }
}
