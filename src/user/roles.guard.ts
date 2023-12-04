/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "./roles.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  
    constructor(private reflector: Reflector) {

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requireRoles = this.reflector.getAllAndOverride<Role[]>("roles", [
        context.getHandler(),
        context.getClass(),
        ]);

        if (!requireRoles) {
            return true;
        }
        const request =context.switchToHttp().getRequest();
        const roles =request.user.roles;

        return requireRoles.some((role) => roles.includes(role));
    }
}