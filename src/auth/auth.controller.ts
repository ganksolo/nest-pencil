import { Controller, Request, UseGuards, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    // 仅当用户通过验证后，才会调用路由处理程序
    async login(@Request() req) {
        return this.authService.generateToken(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getApi(@Request() req) {
        return req.user
    }
}
