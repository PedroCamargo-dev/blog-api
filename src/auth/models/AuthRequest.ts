
import { Request } from "express";
import { UserEntity } from "src/users/entities/user.entity";

export interface AuthRequet extends Request {
  user: UserEntity
}
