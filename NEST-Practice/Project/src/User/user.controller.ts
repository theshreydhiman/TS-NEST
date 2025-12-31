import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserSchema,
  LoginUserSchema,
  UpdateUserSchema,
  UserDto,
} from './UserDto/user.dto';
import { ZodValidationPipe } from 'src/middleware/Pipes/validation.pipe';
import { User } from 'src/middleware/Decorators/user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  getUsers() {
    return this.UserService.getUsers();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  createUsers(@Body() UserDto: UserDto) {
    return this.UserService.createUsers(UserDto);
  }

  @Get('profile')
  getUserbyId(@User() user: Request) {
    return this.UserService.getUserById(user);
  }

  @Put('update')
  @UsePipes(new ZodValidationPipe(UpdateUserSchema))
  updateUser(
    @Body() updateDto: UserDto,
    @User() user: Request,
  ) {
    return this.UserService.updateUser(updateDto, user);
  }

  @Delete()
  deleteUser(@User() user: UserDto) {
    return this.UserService.deleteUser(user);
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginUserSchema))
  userLogin(@Body() cred: Request) {
    return this.UserService.userLogin(cred);
  }

  @Patch('logout')
  logoutUser(@User() user: UserDto) {
    return this.UserService.logoutUser(user);
  }
}
