import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CounterService } from '../counter/counter.service';
import { RewardsService } from 'src/rewards/rewards.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
// import { Reward } from '../schemas/rewards.schema'; // Import the Reward schema

@Injectable()
export class UsersService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findById(_sub: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private counterService: CounterService,
    private rewardsService: RewardsService, // Inject RewardsService to get reward details
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username }).exec();
    console.log('User found in DB:', user); // Log the fetched user object
    return user;
  }

  // Fetch all users with selected fields and update is_active if card is expired
  async getAllUsers() {
    const users = await this.userModel
      .find()
      .select('name card_number is_active card_type card_expiration_date') // Only return selected fields
      .lean() // Convert to plain JavaScript object for easier manipulation
      .exec();

    const currentDate = new Date();

    // Iterate through each user to check if the card has expired
    for (const user of users) {
      if (new Date(user.card_expiration_date) < currentDate) {
        // If the card has expired, set is_active to false in the database
        await this.userModel.updateOne(
          { _id: user._id }, // Find the user by their _id
          { $set: { is_active: false } }, // Update is_active to false
        );

        // After updating the database, update the is_active in the response as well
        user.is_active = false;
      }
    }

    // Return updated user data with renamed user_id and other selected fields
    return users.map((user) => ({
      user_id: user._id, // Rename _id to user_id
      name: user.name,
      card_number: user.card_number,
      is_active: user.is_active,
      card_type: user.card_type,
      card_expiration_date: user.card_expiration_date,
    }));
  }

  // Get user by ID
  async getUserById(userId: string) {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the card has expired and update is_active accordingly
    const currentDate = new Date();
    if (new Date(user.card_expiration_date) < currentDate) {
      user.is_active = false;
      await user.save(); // Save the updated user in the database
    }

    // Return the full user details
    return {
      user_id: user._id, // Return the user_id (which is _id)
      name: user.name,
      contact_number: user.contact_number,
      card_number: user.card_number,
      card_type: user.card_type,
      points: user.points,
      card_start_date: user.card_start_date,
      card_expiration_date: user.card_expiration_date,
      is_active: user.is_active,
      redeem_requests: user.redeem_requests,
      rewards: user.rewards, // Include the rewards array
    };
  }

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
  async registerUser(
    name: string,
    contact_number: string,
    username: string,
    password: string,
    email?: string,
  ) {
    const card_number = await this.counterService.getNextCardNumber();
    const points = 0;
    const card_type = this.determineCardType(points);

    const card_start_date = new Date();
    const card_expiration_date = new Date(card_start_date);
    card_expiration_date.setFullYear(card_expiration_date.getFullYear() + 2);
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password before saving
    const newUser = new this.userModel({
      name,
      contact_number,
      username,
      password: hashedPassword,
      email, // Optional email
      card_number,
      card_type,
      points,
      card_start_date,
      card_expiration_date,
      is_active: true,
      redeem_requests: [],
      rewards: [], // Initialize the rewards as an empty array
    });

    return newUser.save();
  }

  // Update user
  async updateUser(userId: string, updateData: Partial<UpdateUserDto>) {
    const user = await this.userModel.findByIdAndUpdate(userId, updateData, {
      new: true, // Return the updated user
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  // Delete user
  async deleteUser(userId: string) {
    const user = await this.userModel.findByIdAndDelete(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }

  // Automatically increment the user's points and recalculate card type
  async updateUserPoints(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.points += 1;
    user.card_type = this.determineCardType(user.points);

    return user.save();
  }

  // Redeem a reward based on user_id and reward_id
  async redeemReward(userId: string, rewardId: string) {
    // Find the user by ID
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Fetch the reward details
    const reward = await this.rewardsService.getRewardById(rewardId);
    if (!reward) {
      throw new Error('Reward not found');
    }

    // Check if the reward is already in redeem_requests
    if (!user.redeem_requests.includes(rewardId)) {
      // If not, add the reward_id to redeem_requests
      user.redeem_requests.push(rewardId);
      await user.save();
      return { message: `Reward ID ${rewardId} added to redeem requests.` };
    } else {
      // If it exists, move it to the rewards array
      user.rewards.push(rewardId);

      // Remove the reward_id from redeem_requests
      user.redeem_requests = user.redeem_requests.filter(
        (id) => id !== rewardId,
      );

      // Save the updated user
      await user.save();

      return { message: `Reward ID ${rewardId} moved to rewards.` };
    }
  }
}
