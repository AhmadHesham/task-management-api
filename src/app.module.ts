import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/entity/user.model';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { Project } from './project/entity/project.model';
import { TaskModule } from './task/task.module';
import { Task } from './task/entity/task.model';

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot(),
        AuthModule,
        ProjectModule,
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT) | 5432,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            models: [User, Project, Task],
        }),
        TaskModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
