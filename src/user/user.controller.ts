import { Controller, Post, Get, Body} from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';


@Controller()
export class UserController {
    constructor(private userService: UserService) {}

    @Get('user')
    getUser() {
        return 'user action';
    }

    @Get('userInfo')
    getUserInfo() {
        return 'user info!!'
    }

    @Post('users')
    async create(@Body() userReqData: CreateUserDto) {
        return await this.userService.create(userReqData)
    }
}
