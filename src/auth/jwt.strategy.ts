// src/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service'; // Ensure the path is correct

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the Authorization header
      secretOrKey: 'your-secret-key', // Use a secure secret in production
    });
  }

  // Validate the JWT payload and fetch the user from the database
  async validate(payload: any) {
    const user = await this.usersService.findById(payload.sub);

    if (user === null || user === undefined) {
      throw new Error('User not found');
    }

    return user; // Return user data to be attached to the request object
  }
}
