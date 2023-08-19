import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryReturnType } from 'src/common/dto/UpdateReturnType';
import { CreateProjectsDto, UpdateProjectDto } from './dto/project.dto';
import { Project } from './entity/project.model';

@Injectable()
export class ProjectService {
    constructor(@InjectModel(Project) private projectsType: typeof Project) {}

    async findAll(userId: number): Promise<Project[] | undefined> {
        return this.projectsType.findAll({
            where: { owned_by: userId },
        });
    }

    async create(payload: CreateProjectsDto, userId: number): Promise<Project> {
        return this.projectsType.create({
            owned_by: userId,
            name: payload.name,
            description: payload.description,
        });
    }

    async update(payload: UpdateProjectDto): Promise<QueryReturnType<Project>> {
        const { projectId, ...updateFields } = payload;
        return this.projectsType.update(updateFields, {
            where: { id: projectId },
            returning: true,
        });
    }
}
