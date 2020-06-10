import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { UserData } from '../user/user.interface';
import { JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validatorUser(username: string, password: string): Promise<UserData> {
        const user = this.userService.findByUsername(username)
        if(user && await argon2.verify((await user).password, password)) {
            const { password, ...result } = await user;
            return result;
        }
        return null;
    }

    async generateToken(user) {
        const payload = user
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
