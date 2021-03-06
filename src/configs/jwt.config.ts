import {ConfigService} from "@nestjs/config";
import {JwtModuleOptions} from "@nestjs/jwt";

export const getJWTconfig = async (configService: ConfigService):Promise<JwtModuleOptions > =>{
    return {
        secret:configService.get('PRIVATE_KEY')
    }
}