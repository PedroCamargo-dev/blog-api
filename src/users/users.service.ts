import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) { }

  create(createUserDto: CreateUserDto) {
    return this.repository.create(createUserDto);
  }

  findUser(id: number) {
    const user = this.repository.findUser(id);

    if (!user) {
      throw new NotFoundError('User not found or deleted.')
    }

    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new NotFoundError('Email or password not found.');
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.repository.update(id, updateUserDto);

    if (!user) {
      throw new NotFoundError('User not found or deleted.')
    }

    return user;
  }

  remove(id: number) {
    const user = this.repository.remove(id);

    if (!user) {
      throw new NotFoundError('User not found or deleted.')
    }

    return user;
  }
}
