import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { UserData } from '../user/user.interface';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async validatorUser(username: string, password: string): Promise<UserData> {
        const user = this.userService.findByUsername(username)
        if(user && await argon2.verify((await user).password, password)) {
            const { password, ...result } = await user;
            return result;
        }
        return null;
    }
}
