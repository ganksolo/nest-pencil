import { Controller, Post, Get, Put, Body, Delete, Query, Param, Request, UseGuards} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    @Get()
    async getUser(@Query() query?: string) {
        console.log(query)
        return this.userService.findAll(query);
    }
    
    @Get(':id')
    async getUserById(@Param('id') id) {
        return await this.userService.findById(id);
    }


    @UseGuards(JwtAuthGuard)
    @Delete(':slug')
    async delete(@Param() params) {
        return await this.userService.delete(params.slug);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id, @Body() userData: UpdateUserDto) {
        return await this.userService.update(id, userData);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() userReqData: CreateUserDto) {
        return await this.userService.create(userReqData);
    }
}
