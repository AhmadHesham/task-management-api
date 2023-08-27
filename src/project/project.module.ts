import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project } from './entity/project.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskModule } from 'src/task/task.module';
import { BullModule } from '@nestjs/bull';
import { ProjectConsumer } from './consumer/project.consumer';

@Module({
    imports: [
        SequelizeModule.forFeature([Project]),
        TaskModule,
        BullModule.registerQueue({ name: process.env.PROJECTS_QUEUE_NAME }),
    ],
    providers: [ProjectService, ProjectConsumer],
    controllers: [ProjectController],
})
export class ProjectModule {}
