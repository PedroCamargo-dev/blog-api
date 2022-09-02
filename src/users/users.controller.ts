import {
  Body, Controller, Delete, Get, Param, Patch, Post
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiResponse({ status: 409, description: 'Conflito de email' })
  @ApiForbiddenResponse({ description: 'Acesso negado.' })
  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado.' })
  @Post('/email')
  findByEmail(@Body() createUserDto: CreateUserDto, email: string) {
    return this.usersService.findByEmail(email);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado.' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiForbiddenResponse({ description: 'Acesso negado.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
