import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Role } from "src/users/role.enum";
import { Injectable } from "@nestjs/common";

export type jwtpayload={
    sub:number;
    email:string;
    role:Role;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private config:ConfigService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:config.getOrThrow<string>('JWT_SECRET')
            });
    }
    validate(payload:jwtpayload){
        return {userId:payload.sub,email:payload.email,role:payload.role};
    
    }

}