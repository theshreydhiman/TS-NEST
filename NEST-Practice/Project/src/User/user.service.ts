import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable
} from '@nestjs/common';
import { UserDto } from './UserDto/user.dto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from './user.entity';
import { userMetaData } from './Interfaces/user.interface';

@Injectable()
export class UserService {

  constructor(
    @Inject('User-Repo')
    private userRepo: typeof User
  ) {}

  private createJWT(metadata: userMetaData){
    return jwt.sign(metadata, 'mySecretKey');
  }

  private async hashPassword(plainPass: string){
    return await bcrypt.hash(plainPass, 10);
  }

  private async validatepassword(plainPass: string, hash: string){
    return await bcrypt.compare(plainPass, hash);
  }

  async getUsers() {
    return await this.userRepo.findAll<User>()
  }

  async getUserById(user: any) {
    try {

      let users = await this.userRepo.findOne<User>({where: {Email: user.Email}});
  
      const {Hash, Token, Salt, RefToken, ...safeUsers} = users?.dataValues;
  
      return safeUsers;
    } catch (error) {
      return error.response
    }
  }

  async createUsers(UserDto: any) {
    try {
      const count = await this.userRepo.count<User>({ where: {Email: UserDto.Email}});
  
      if (count > 0) {
        throw new ConflictException({
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'Email already taken',
        });
      }
  
      UserDto.Hash = await this.hashPassword(UserDto.Password);
  
      delete UserDto.Password;
  
      let data = await this.userRepo.create<User>(UserDto);
  
      return { id: data.dataValues.id };
    } catch (error) {
      return error;
    }
  }

  async updateUser(UserDto: any, user: any) {
    let users = await this.userRepo.findOne<User>({where: {Email: user.Email}});

    if (UserDto.Email) {
      const count = await this.userRepo.count<User>({ where: {Email: UserDto.Email}});

      if (count > 0) {
        throw new ConflictException({
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'Email already taken',
        });
      }
    }

    if (UserDto.Password) {
      UserDto.Hash = await this.hashPassword(UserDto.Password);
      delete UserDto.Password;
    }

    this.userRepo.update<User>(UserDto, {where:{Email: user.Email}});

    return UserDto;
  }

  async deleteUser(user: UserDto) {

    const deletedUser = await this.userRepo.destroy({ where: {Email: user.Email}});

    return deletedUser;
  }

  async userLogin(cred) {
    const data = await this.userRepo.findOne<User>({ where: {Email: cred.Email}});

    if (!data) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'Invalid credentials',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    let hashedPassword = data?.dataValues.Hash;

    let isCorrect = await this.validatepassword(cred.Password, hashedPassword);

    if (!isCorrect) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'Invalid credentials',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const userMetaData = {
      Id: data?.dataValues.Id,
      Name: data?.dataValues.Name,
      Age: data?.dataValues.Age,
      Email: data?.dataValues.Email,
    };

    let Token =  this.createJWT(userMetaData);

    await this.userRepo.update<User>({Token}, { where: {Email: cred.Email}});

    return { token: Token };
  }

  async logoutUser(user: UserDto) {
    await this.userRepo.update<User>({Token: null}, { where: {Email: user.Email}});

    return 'User Logged out!';
  }
}
