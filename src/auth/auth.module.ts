// src/auth/auth.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule and ConfigService
import { UsersModule } from 'src/users/users.module'; // Assuming UsersService is inside UsersModule
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RolesGuard } from '../auth/roles.guard'; // Import the guard
import { JwtStrategy } from '../auth/jwt.strategy'; // You may need to implement this

@Module({
  imports: [
    PassportModule,
    ConfigModule, // Ensure ConfigModule is imported
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule for async registration
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Use the JWT_SECRET from .env
        signOptions: { expiresIn: '60m' }, // Token expiration time
      }),
      inject: [ConfigService], // Inject ConfigService to access env variables
    }),
    forwardRef(() => UsersModule), // Use forwardRef to avoid circular dependency
  ],
  providers: [AuthService, RolesGuard, JwtStrategy], // Add JwtStrategy and RolesGuard to providers
  controllers: [AuthController],
  exports: [AuthService, JwtModule], // Export JwtModule instead of JwtService
})
export class AuthModule {}
