import { Injectable } from '@nestjs/common';
import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedError';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './repositories/posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly repository: PostsRepository) { }

  async create(email: string, createPostDto: CreatePostDto) {
    return this.repository.create(email, createPostDto);
  }

  async findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  async update(id: number, email: string, idUser: number, updatePostDto: UpdatePostDto) {
    return this.repository.update(id, email, idUser, updatePostDto);
  }

  async remove(id: number) {
    return this.repository.remove(id);
  }
}
