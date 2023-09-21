import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ role: 'user', cmd: 'get-all' })
  async getAll(@Payload() payload: { queries: any }) {
    const { queries } = payload;
    const conditions = {};
    if (queries.office_code) {
      conditions['office_code'] = queries.office_code;
    }
    if (queries.id) {
      conditions['id'] = queries.id;
    }
    return this.usersService.getAll(conditions);
  }

  @MessagePattern({ role: 'user', cmd: 'get-one' })
  async getOne(@Payload() payload: { id: number }) {
    return this.usersService.getOne(payload.id);
  }

  @MessagePattern({ role: 'user', cmd: 'create' })
  async createOne(@Payload() payload: { user: CreateUserDto }) {
    return this.usersService.create(payload.user);
  }

  @MessagePattern({ role: 'user', cmd: 'update' })
  async updateOne(@Payload() payload: { id: number; user: CreateUserDto }) {
    return this.usersService.update(payload.id, payload.user);
  }

  @MessagePattern({ role: 'user', cmd: 'delete' })
  async deleteOne(@Payload() payload: { id: number }) {
    return this.usersService.remove(payload.id);
  }

  @MessagePattern({ role: 'auth', cmd: 'validate' })
  async validateUser(@Payload() payload: { email: string; password: string }) {
    return this.usersService.validateUser(payload);
  }

  @MessagePattern({ role: 'auth', cmd: 'signup' })
  async userSignup(@Payload() payload: { user: CreateUserDto }) {
    return this.usersService.userSignup(payload.user);
  }

  @MessagePattern({ role: 'auth', cmd: 'google' })
  async googleSignIn(@Payload() payload: { googleUser: any }) {
    return this.usersService.googleSignIn(payload.googleUser);
  }
}
