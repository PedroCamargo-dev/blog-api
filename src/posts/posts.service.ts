import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './repositories/posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly repository: PostsRepository) { }

  create(email: string, createPostDto: CreatePostDto) {
    return this.repository.create(email, createPostDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, email: string, updatePostDto: UpdatePostDto) {
    return this.repository.update(id, email, updatePostDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
