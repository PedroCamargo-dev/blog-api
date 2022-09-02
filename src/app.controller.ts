import { Controller, Get } from '@nestjs/common';
import { get } from 'http';
import { AppService } from './app.service';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { UserEntity } from './users/entities/user.entity';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('me')
    getMe(@CurrentUser() user: UserEntity) {
        return user.name;
    }
}