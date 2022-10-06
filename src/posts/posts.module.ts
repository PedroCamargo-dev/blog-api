import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsRepository } from './repositories/posts.repository';
import { UsersRepository } from 'src/users/repositories/users.repository';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService, PostsRepository],
})
export class PostsModule { }
