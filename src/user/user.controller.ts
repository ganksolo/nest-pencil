import { Controller, Post, Get, Body, Delete, Param} from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';


@Controller()
export class UserController {
    constructor(private userService: UserService) {}

    @Get('user')
    async getUser() {
        return this.userService.findAll();
    }

    @Get('user/:id')
    async getUserById(@Param('id') id) {
        return await this.userService.findById(id);
    }

    @Delete('users/:slug')
    async delete(@Param() params) {
        return await this.userService.delete(params.slug);
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
