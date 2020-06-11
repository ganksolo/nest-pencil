import { IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateUserDto {
    
    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly password: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly bio: string;

    @IsNotEmpty()
    readonly image: string;
}