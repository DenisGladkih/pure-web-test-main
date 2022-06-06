import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {USER_UNAUTHORIZED_ERROR} from "../../constants/error.constants";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1]
            req.user = this.jwtService.verify(token, {secret: process.env.PRIVATE_KEY});
            return true;
        } catch (e) {
            throw new UnauthorizedException({message: USER_UNAUTHORIZED_ERROR})
        }
    }
}