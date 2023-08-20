import { IsEmail, IsNotEmpty } from 'class-validator';

export interface JwtResponse {
    access_token: string;
}

export class SignInDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
