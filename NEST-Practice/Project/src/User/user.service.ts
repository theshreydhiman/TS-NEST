import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { UserDto } from "./UserDto/user.dto";
import Joi from "Joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUserSchema = Joi.object({
    Name: Joi.string().required(),
    Age: Joi.number().required(),
    Location: Joi.string(),
    Email: Joi.string().required(),
    Password: Joi.string().required()
});

const updateUserSchema = Joi.object({
    Name: Joi.string(),
    Age: Joi.number(),
    Location: Joi.string(),
    Email: Joi.string(),
    Password: Joi.string()
});

const userLoginSchema = Joi.object({
    Email: Joi.string().required(),
    Password: Joi.string().required()
});



@Injectable()
export class UserService {

    // In-memory store
    public users: { Id: number; UserName: string; Name: string; Age: Number; Location: string; Email: string; Hash: string, Salt: string, RefToken: string, Token?: string, LastActive: Date }[] = [];
    private nextId = 1;

    getUsers() {
        return this.users;
    }

    getUserById(id: Number, user: any) {


        const idx = this.users.findIndex((u) => u.Id == id);

        if (idx == -1 || this.users[idx].Id != user.Id) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                error: 'User Not Found',
            });
        }

        return this.users.find(u => u.Id == id)
    }

    async createUsers(UserDto: UserDto) {

        const { error, value } = createUserSchema.validate(UserDto);

        if (error) {
            throw new BadRequestException({
                status: HttpStatus.BAD_REQUEST
            }, {
                cause: error.details[0].message
            });
        }

        const idx = this.users.findIndex((u) => u.Email.toLowerCase() == UserDto.Email.toLowerCase());

        if (idx >= 0) {
                throw new ConflictException({
                    status: HttpStatus.NOT_ACCEPTABLE,
                    error: 'Email already taken',
                });
        }

        value.Hash = await bcrypt.hash(value.Password, 10);

        delete value.Password;

        const user = {
            Id: this.nextId++,
            ...value,
        }

        return { id: this.users.push(user) };
    }

    updateUser(UserDto: UserDto, user: any) {

        const { error, value } = updateUserSchema.validate(UserDto);

        if (error) {
            return error.details[0].message;
        }

        const idx = this.users.findIndex((u) => u.Email == user.Email);

        if (idx == -1) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                error: 'User Not Found',
            });
        }

        if (UserDto.Email) {
            const data = this.users.filter((u) => u.Email == UserDto.Email && u.Id != user.Id)

            if (data.length > 0) {
                throw new ConflictException({
                    status: HttpStatus.NOT_ACCEPTABLE,
                    error: 'Email already taken',
                });
            }
        }

        const updatedUser = { ...this.users[idx], ...value };

        this.users[idx] = updatedUser;

        return this.users[idx]
    }

    deleteUser(user: UserDto) {
        const idx = this.users.findIndex((u) => u.Email == user.Email);

        if (idx == -1) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                error: 'User Not Found',
            });
        }

        const [deleted] = this.users.splice(idx, 1);

        return deleted;
    }

    async userLogin(cred) {

        const { error, value } = userLoginSchema.validate(cred);

        if (error) {
            return error;
        }

        let idx = this.users.findIndex((u) => u.Email == cred.Email);

        if (idx == -1) {
            throw new HttpException({
                status: HttpStatus.NOT_ACCEPTABLE,
                error: 'Invalid credentials',
            }, HttpStatus.NOT_ACCEPTABLE);
        }

        let hashedPassword = this.users[idx].Hash;

        let isCorrect = await bcrypt.compare(cred.Password, hashedPassword);

        if (!isCorrect) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                error: 'User Not Found',
            });
        }

        const userMetaData = {
            Id: this.users[idx].Id,
            Name: this.users[idx].Name,
            Age: this.users[idx].Age,
            Email: this.users[idx].Email,
        }

        let Token = jwt.sign(userMetaData, 'mySecretKey');

        const updatedUser = { ...this.users[idx], Token };

        this.users[idx] = updatedUser;

        return { token: Token };
    }

    logoutUser(user: UserDto) {

        const idx = this.users.findIndex((u) => u.Email == user.Email);

        if (idx == -1) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                error: 'User Not Found',
            });
        }

        delete this.users[idx].Token;

        return "User Logged out!"
    }
}