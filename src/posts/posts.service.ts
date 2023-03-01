import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedError';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './repositories/posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly repository: PostsRepository) { }

  async create(email: string, createPostDto: CreatePostDto) {
    const post = await this.repository.create(email, createPostDto);

    if (!post) {
      throw new UnauthorizedError('Title or content provided is incomplete')
    }

    return post

  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: number) {
    const post = await this.repository.findOne(id);

    if (!post) {
      throw new NotFoundError('Post not found or deleted.')
    }

    return post;
  }

  async update(id: number, email: string, idUser: number, updatePostDto: UpdatePostDto) {
    return await this.repository.update(id, email, idUser, updatePostDto);
  }

  async remove(id: number) {
    return await this.repository.remove(id);
  }
}
