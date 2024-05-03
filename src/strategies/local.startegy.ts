import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/auth/auth.service";


@Injectable()
export class LocalStatregy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService
    ) { super({ usernameField: 'email' }) }


    async validate(email: string, pass: string) {
        const user = await this.authService.validateUser(email, pass)
        return user.id
    }
}