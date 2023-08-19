import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtResponse, SignInDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) {}

    async signIn(payload: SignInDto): Promise<JwtResponse> {
        const user = await this.userService.findOneByEmail(payload.email);

        if (!user) {
            throw new NotFoundException();
        }

        const passwordsMatch = bcrypt.compareSync(
            payload.password.toString(),
            user.password,
        );
        if (!passwordsMatch) {
            throw new BadRequestException();
        }

        const signature = { sub: user.id, email: user.email };
        return { access_token: this.jwtService.sign(signature) };
    }
}
