import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const createdUser = await this.prisma.user.create({
      data: createUserDto,
      include: {
        posts: {
          select: {
            title: true,
            createdAt: true,
          },
        },
      },
    });

    return {
      ...createdUser,
      password: undefined
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: { email }
    })
  }

  async findUser(id: number): Promise<UserEntity> {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        posts: true,
      }
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto
    });

    return {
      ...updatedUser,
      password: undefined,
    }
  }

  async remove(id: number): Promise<UserEntity> {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
