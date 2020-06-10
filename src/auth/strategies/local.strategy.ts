import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, UsePipes, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }
    // Password策略需要实现validate
    async validate(username: string, password: string): Promise<any>{
        const user = await this.authService.validatorUser(username, password);
        if(!user) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                message: '该用户不存在',
            }, HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}