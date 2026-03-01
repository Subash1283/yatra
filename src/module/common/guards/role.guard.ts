import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Role } from 'src/users/role.enum';
import { Roles_Key } from '../decorators/role.decorator';
import { Reflector } from '@nestjs/core';

@Injectable() // ✅ Add this decorator
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRole = this.reflector.getAllAndOverride<Role[]>(Roles_Key, [ // ✅ make Role[] not Role
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRole) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as { role?: Role };

    if (!user?.role) throw new ForbiddenException('YOUR ROLE IS MISSING');
    if (!requireRole.includes(user.role)) {
      throw new ForbiddenException('ACCESS DENIED');
    }
    return true;
  }
}
