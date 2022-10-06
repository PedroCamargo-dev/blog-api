import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Request, UseGuards
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthRequet } from 'src/auth/models/AuthRequest';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiResponse({ status: 409, description: 'Conflito de email' })
  @ApiForbiddenResponse({ description: 'Acesso negado.' })
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

  @ApiForbiddenResponse({ description: 'Acesso negado.' })
  @Post()
  async findByEmail(@Body() email: string) {
    return this.usersService.findByEmail(email);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado.' })
  @Patch('/profile')
  async update(@Request() req: AuthRequet, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+req.user.id, updateUserDto);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado.' })
  @Delete('/profile')
  @UseGuards(JwtAuthGuard)
  async remove(@Request() req: AuthRequet) {
    return this.usersService.remove(req.user.id);
  }
}
