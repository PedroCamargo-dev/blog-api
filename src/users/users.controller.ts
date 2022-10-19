import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Request, UseGuards
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthRequet } from 'src/auth/models/AuthRequest';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @IsPublic()
  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async profile(@Request() req: AuthRequet) {
    return this.usersService.findUser(req.user.id)
  }

  @Post()
  async findByEmail(@Body() email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch('/profile')
  async update(@Request() req: AuthRequet, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @Delete('/profile')
  @UseGuards(JwtAuthGuard)
  async remove(@Request() req: AuthRequet) {
    return this.usersService.remove(req.user.id);
  }
}
