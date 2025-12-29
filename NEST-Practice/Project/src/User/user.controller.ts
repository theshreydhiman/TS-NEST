import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./UserDto/user.dto";

@Controller('users')
export class UserController {

    constructor(private readonly UserService: UserService) { }

    @Get()
    getUsers() {
        return this.UserService.getUsers();
    }

    @Post()
    createUsers(@Body() UserDto: UserDto) {
        return this.UserService.createUsers(UserDto);
    }

    @Get(':id')
    getUserbyId(@Param('id') id: Number, @Req() request: any) {
        return this.UserService.getUserById(id, request.user);
    }

    @Put('update')
    updateUser(@Body() UserDto: UserDto, @Req() request: any) {
        return this.UserService.updateUser(UserDto, request.user);
    }

    @Delete(':id')
    deleteUser(@Req() request: any) {
        return this.UserService.deleteUser(request.user);
    }

    @Post('login')
    userLogin(@Body() cred: Request) {
        return this.UserService.userLogin(cred);
    }

    @Patch('logout')
    logoutUser(@Req() request: any) {
        return this.UserService.logoutUser(request.user);
    }
}