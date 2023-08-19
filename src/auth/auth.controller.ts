import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtResponse, SignInDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() payload: SignInDto): Promise<JwtResponse> {
        return this.authService.signIn(payload);
    }
}
