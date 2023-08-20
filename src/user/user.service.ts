import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    constructor(@InjectModel(User) private user: typeof User) {}

    async findAll(): Promise<User[]> {
        try {
            return this.user.findAll();
        } catch (e) {
            // This part is just for developer logging
            // When this is developed to a cloud provider
            // like gcp for example, we want to check the err
            // in the logs, so this is useful for such a case
            const err = e.message ? e.message : JSON.stringify(e);
            this.logger.error(`Failed to find all users ${err}`);

            // Throw e again so that nest can handle it
            // And set the appropriate error code
            throw e;
        }
    }

    async findOneById(id: number): Promise<User | undefined> {
        try {
            return this.user.findOne({ where: { id } });
        } catch (e) {
            const err = e.message ? e.message : JSON.stringify(e);
            this.logger.error(`Failed to find user with id: ${id}, ${err}`);
            throw e;
        }
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        try {
            return this.user.findOne({ where: { email } });
        } catch (e) {
            const err = e.message ? e.message : JSON.stringify(e);
            this.logger.error(
                `Failed to find user with email: ${email}, ${err}`,
            );
            throw e;
        }
    }

    async create(payload: UserDto): Promise<User> {
        try {
            const salt = bcrypt.genSaltSync();
            const hashedPassword = bcrypt.hashSync(
                payload.password.toString(),
                salt,
            );
            return this.user.create({
                first_name: payload.firstName,
                last_name: payload.lastName,
                email: payload.email,
                password: hashedPassword,
            });
        } catch (e) {
            const err = e.message ? e.message : JSON.stringify(e);
            this.logger.error(`Failed to create user ${err}`);
            throw e;
        }
    }
}
