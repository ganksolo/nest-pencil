import { Injectable, ExecutionContext, NotFoundException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserLoginDto } from '../../user/dto/create-user.dto';
import { throwError } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    constructor(private authService: AuthService) {
        super();
    }
    canActivate(context: ExecutionContext) {
        const request  = context.switchToHttp().getRequest();
        const body: UserLoginDto = request.body
        
        if (Object.keys(body).length !== 2) {
            throw new NotFoundException({
                message: '请填写完整的账号和密码',
                status: HttpStatus.NOT_FOUND
            })
        }

        return super.canActivate(context);
    }
 }