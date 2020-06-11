import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}

export class UserLoginDto {
    
    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly password: string;
}
