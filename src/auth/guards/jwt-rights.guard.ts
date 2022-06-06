import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {FORBIDDEN_ERROR} from "../../constants/error.constants";

@Injectable()
export class JwtRightsGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const userIdFromParams = request.params.userId;
        const userIdFromRequest = request.user.id;
        if (userIdFromParams != userIdFromRequest) throw new ForbiddenException(FORBIDDEN_ERROR);
        return true;
    }
}