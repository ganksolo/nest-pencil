import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  // 仅当用户通过验证后，才会调用路由处理程序
  async login(@Request() req) {
    console.log(req.user)
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth')
  async getApi(@Request() req) {
    return req.user
  }
}
