// src/users/users.module.ts

import { Module, forwardRef } from '@nestjs/common'; // Import forwardRef
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema } from '../schemas/user.schema';
import { CounterService } from 'src/counter/counter.service';
import { CounterSchema } from 'src/schemas/counter.schema';
import { RewardsModule } from 'src/rewards/rewards.module';
import { AuthModule } from 'src/auth/auth.module'; // Import AuthModule

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Counter', schema: CounterSchema },
    ]),
    RewardsModule,
    forwardRef(() => AuthModule), // Ensure forwardRef here to avoid circular dependency
  ],
  providers: [UsersService, CounterService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
