import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { RewardsModule } from './rewards/rewards.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Connect to MongoDB locally
    MongooseModule.forRoot('mongodb://localhost:27017/rawncafe'), // Correct connection string for local MongoDB
    UsersModule,
    RewardsModule,
    AuthModule,
  ],
})
export class AppModule {}
