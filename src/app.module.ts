// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RewardsModule } from './rewards/rewards.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule globally available
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // Use environment variable for URI
        serverSelectionTimeoutMS: 5000, // Adjust the timeout as needed
        socketTimeoutMS: 45000, // Adjust socket timeout
        family: 4, // Forces the use of IPv4 (value 4 means IPv4, 6 means IPv6)
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    RewardsModule,
    AuthModule,
  ],
})
export class AppModule {}
