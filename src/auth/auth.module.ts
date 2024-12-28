// src/auth/auth.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module'; // Assuming UsersService is inside UsersModule
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RolesGuard } from '../auth/roles.guard'; // Import the guard
import { JwtStrategy } from '../auth/jwt.strategy'; // You may need to implement this

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', // Store it securely, in production, use env variables
      signOptions: { expiresIn: '60m' }, // Token expiration time
    }),
    forwardRef(() => UsersModule), // Use forwardRef to avoid circular dependency
  ],
  providers: [AuthService, RolesGuard, JwtStrategy], // Add JwtStrategy and RolesGuard to providers
  controllers: [AuthController],
  exports: [AuthService, JwtModule], // Export JwtModule instead of JwtService
})
export class AuthModule {}
