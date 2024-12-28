// src/auth/roles.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../users/roles/role.enum'; // Update with your role enum if necessary

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService, // Inject JwtService here
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!roles) {
      return true; // If no roles defined, access is granted
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1]; // Extract token from authorization header
    if (!token) {
      return false; // No token, deny access
    }

    try {
      const decoded = this.jwtService.verify(token); // Verify token
      const userRole = decoded.role; // Assuming the role is part of the decoded token
      return roles.includes(userRole); // Check if the user's role is in the allowed roles
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false; // Invalid token or token error, deny access
    }
  }
}
