import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entity/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    providers: [UserService],
    controllers: [UserController],
	exports: [UserService]
})
export class UserModule {}
