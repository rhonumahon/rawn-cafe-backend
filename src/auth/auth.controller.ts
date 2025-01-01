// src/auth/auth.controller.ts
import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto'; // You need a DTO for login (username and password)
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService, // Inject UsersService to access createUser method
  ) {}

  // Login endpoint
  // Login endpoint
  @Post('login') // POST /auth/login
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      return { error: 'The username or password you’ve entered is incorrect!' };
    }

    return this.authService.login(user);
  }
}
