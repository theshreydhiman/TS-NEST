import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';
import z from 'zod';

export class UserDto {
    @IsString()
    Name: string;
    @IsString()
    UserName: string;
    @IsNumber()
    Age: Number;
    @IsString()
    Location: string;
    @IsString()
    Email: string;
    @IsString()
    Password?: string;
    @IsString()
    Hash?: string;
    @IsString()
    Salt?: string;
    @IsString()
    RefToken?: string;
    @IsString()
    Token?: string;
    @IsDate()
    @Type(() => Date)
    LastActive?: Date;
}

export const BaseUserSchema = z.object({
    Name: z.string().min(3),
    UserName: z.string().min(3),
    Email: z.string().email(),
    Password: z.string().min(6),
    Age: z.number().optional(),
    Location: z.string().optional(),
});

export const CreateUserSchema = BaseUserSchema.pick({
    Name: true,
    UserName: true,
    Email: true,
    Password: true,
});

export const UpdateUserSchema = BaseUserSchema
.partial()
.refine(data => Object.keys(data).length>0 ,{
    message: "At least one key is required"
})

export const LoginUserSchema = BaseUserSchema.pick({
    Email: true,
    Password: true,
}).strict();