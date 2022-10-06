import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequet } from 'src/auth/models/AuthRequest';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @ApiForbiddenResponse({ description: 'Acesso negado.' })
  @Post()
  async create(@Request() req: AuthRequet, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(req.user.email, createPostDto);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado.' })
  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @ApiForbiddenResponse({ description: 'Acesso negado.' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado.' })
  @Patch(':id')
  async update(@Param('id') id: string, @Request() req: AuthRequet, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, req.user.email, req.user.id, updatePostDto);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado.' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
