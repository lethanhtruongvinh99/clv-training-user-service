import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Inject,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ClientKafka } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

const bcrypt = require('bcrypt');
const passwordGenerator = require('generate-password');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
    @Inject('AUTH_KAFKA') private readonly authKafka: ClientKafka,
    private readonly jwtService: JwtService,
  ) {}

  private readonly userDataSource = this.dataSource.getRepository(User);
  async create(createUserDto: CreateUserDto) {
    // const users = await this.userRepository.find({
    //   where: { email: createUserDto.email },
    //   relations: { roles: true },
    // });
    const user = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (!user) {
      createUserDto.password = '123123';
      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(createUserDto.password, salt);
      createUserDto.salt = salt;
      createUserDto.hashed_password = hashed;
      const newUser = this.userRepository.create(createUserDto);
      return this.userRepository.save(newUser);
    } else {
      throw new NotFoundException('User not found~');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (user) {
      Object.assign(user, updateUserDto);
      return this.userRepository.save(user);
    } else {
      throw new NotFoundException('User not found~');
    }
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async validateUser(data: { email: string; password: string }) {
    const user = await this.userRepository.findOne({
      where: {
        email: data.email,
        // password: createUserDto.password,
      },
      relations: {
        roles: true,
      },
    });
    if (!user) {
      return new UnauthorizedException('Unauthorized~');
    }
    const verifyPassword = await bcrypt.hashSync(data.password, user.salt);
    if (user.hashed_password !== verifyPassword) {
      throw new UnauthorizedException('Unauthorized~');
    }
    return user;
  }

  async validateToken(token: string) {
    // try to verify.
    // if ok
    // decode and send back
    console.log(token);
    console.log(this.jwtService.decode(token));
    // console.log(this.jwtService.verify(token));
    try {
      const isValid = this.jwtService.verify(token);
      // return this.jwtService.decode(token);
      return isValid;
    } catch (error) {
      Logger.log(error);
      return false;
    }
  }

  async userSignup(createUserDto: CreateUserDto) {
    const users = await this.userRepository.find({
      where: { email: createUserDto.email },
      relations: { roles: true },
    });
    if (!users[0]) {
      // createUserDto.password = '123123';
      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(createUserDto.password, salt);
      createUserDto.salt = salt;
      createUserDto.hashed_password = hashed;
      const newUser = this.userRepository.create(createUserDto);
      this.authKafka.emit('signup', { newUser });
      return this.userRepository.save(newUser);
    } else {
      return new NotFoundException('User not found~');
    }
  }

  async googleSignIn(user: any) {
    const targetUser = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (targetUser) {
      return targetUser;
    } else {
      const defaultPassword = passwordGenerator.generate({
        length: 10,
        numbers: true,
      });
      console.log(defaultPassword);
      user.password = defaultPassword;
      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(user.password, salt);
      user.salt = salt;
      user.hashed_password = hashed;
      const newUser = this.userRepository.create({
        ...user,
        first_name: user.firstName,
        last_name: user.lastName,
      });
      this.authKafka.send('google-signup', {
        email: user.email,
        password: defaultPassword,
        name: `${user.firstName} ${user.lastName}`,
      });
      return await this.userRepository.save(newUser);
    }
  }

  async getAll(conditions: any) {
    this.authKafka.emit('something', 'get all users');
    return this.userRepository.find({
      where: conditions,
      order: { id: 'DESC' },
    });
  }

  async getOne(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });
      if (user) {
        return user;
      } else {
        return new NotFoundException();
      }
    } catch (error) {
      return new NotFoundException();
    }
  }
}
