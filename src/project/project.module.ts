import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project } from './entity/project.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [SequelizeModule.forFeature([Project])],
    providers: [ProjectService],
    controllers: [ProjectController],
})
export class ProjectModule {}
