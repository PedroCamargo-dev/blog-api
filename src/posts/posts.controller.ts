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
import { AuthRequet } from 'src/auth/models/AuthRequest';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  async create(@Request() req: AuthRequet, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(req.user.email, createPostDto);
  }

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Request() req: AuthRequet, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, req.user.email, req.user.id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
