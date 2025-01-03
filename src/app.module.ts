// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RewardsModule } from './rewards/rewards.module';
import { AuthModule } from './auth/auth.module';
import { HttpsProxyAgent } from 'https-proxy-agent';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule globally available
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGO_URI'); // MongoDB connection string
        const proxyUrl = configService.get<string>('QUOTAGUARDSHIELD_URL'); // QuotaGuard proxy URL

        // Set up proxy agent
        const proxyAgent = new HttpsProxyAgent(proxyUrl);

        return {
          uri: mongoUri,
          family: 4, // Forces the use of IPv4
          driverOptions: {
            agent: proxyAgent, // Use proxy agent for requests
          },
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    RewardsModule,
    AuthModule,
  ],
})
export class AppModule {}
