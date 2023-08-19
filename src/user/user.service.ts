import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private user: typeof User,
    ) {}

    async findAll(): Promise<User[]> {
        return this.user.findAll();
    }

    async findOneById(id: number): Promise<User | undefined> {
        return this.user.findOne({ where: { id } });
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.user.findOne({ where: { email } });
    }

    async create(payload: UserDto): Promise<User> {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(payload.password.toString(), salt);
        return this.user.create({
            first_name: payload.firstName,
            last_name: payload.lastName,
            email: payload.email,
            password: hashedPassword,
        });
    }
}
