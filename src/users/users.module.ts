import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema } from '../schemas/user.schema';
import { CounterService } from 'src/counter/counter.service';
import { CounterSchema } from 'src/schemas/counter.schema';
import { RewardsModule } from 'src/rewards/rewards.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Counter', schema: CounterSchema },
    ]),
    RewardsModule,
  ],
  providers: [UsersService, CounterService],
  controllers: [UsersController],
})
export class UsersModule {}
