import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryReturnType } from 'src/common/types/UpdateReturnType';
import { Task } from 'src/task/entity/task.model';
import { TaskService } from 'src/task/task.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { Project } from './entity/project.model';
import { CreateTaskDto } from 'src/task/dto/task.dto';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project) private projectsRepository: typeof Project,
        private taskService: TaskService,
    ) {}

    async findAllProjects(userId: number): Promise<Project[] | undefined> {
        return await this.projectsRepository.findAll({
            where: { owned_by: userId },
        });
    }

    async createProject(
        payload: CreateProjectDto,
        userId: number,
    ): Promise<Project> {
        return await this.projectsRepository.create({
            owned_by: userId,
            name: payload.name,
            description: payload.description,
        });
    }

    async updateProject(
        userId: number,
        projectId: string,
        payload: UpdateProjectDto,
    ): Promise<QueryReturnType<Project>> {
        const project = await this.projectsRepository.update(payload, {
            where: { id: projectId, owned_by: userId },
            returning: true,
        });

        if (project[0] === 0) throw new NotFoundException('Project not found');

        return project;
    }

    async deleteProject(userId: number, projectId: string): Promise<number> {
        const count = await this.projectsRepository.destroy({
            where: { id: projectId, owned_by: userId },
        });

        if (count === 0) throw new NotFoundException('Project not found');

        return count;
    }

    async createTask(projectId: string, payload: CreateTaskDto): Promise<Task> {
        const project = await this.projectsRepository.findOne({
            where: { id: projectId },
        });

        if (!project) {
            throw new NotFoundException('Project not found');
        }

        return await this.taskService.createTask(projectId, payload);
    }

    async getProjectTasks(projectId: string): Promise<Task[]> {
        const project = await this.projectsRepository.findOne({
            where: { id: projectId },
        });

        if (!project) {
            throw new NotFoundException('Project not found');
        }

        return await this.taskService.getProjectTasks(projectId);
    }

    async deleteTask(projectId: string, taskId: string): Promise<number> {
        return await this.taskService.deleteTask(projectId, taskId);
    }
}
