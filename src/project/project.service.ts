import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryReturnType } from 'src/common/types/UpdateReturnType';
import { Task } from 'src/task/entity/task.model';
import { TaskService } from 'src/task/task.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { Project } from './entity/project.model';
import { CreateTaskDto } from 'src/task/dto/task.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ProjectService {
    private readonly logger = new Logger(ProjectService.name);

    constructor(
        @InjectModel(Project) private projectsRepository: typeof Project,
        private taskService: TaskService,
        @InjectQueue(process.env.PROJECTS_QUEUE_NAME)
        private readonly projectQueue: Queue,
    ) {}

    async findAllProjects(userId: number): Promise<Project[] | undefined> {
		try {
        return await this.projectsRepository.findAll({
            where: { owned_by: userId },
        });
		} catch(e) {
            // This part is just for developer logging
            // When this is developed to a cloud provider
            // like gcp for example, we want to check the err
            // in the logs, so this is useful for such a case
            const err = e.message ? e.message : JSON.stringify(e);
            this.logger.error(`Failed to find all projects ${err}`);

            // Throw e again so that nest can handle it
            // And set the appropriate error code
            throw e;
		}
    }

    async createProject(
        payload: CreateProjectDto,
        userId: number,
    ): Promise<Project> {
        try {
            return await this.projectsRepository.create({
                owned_by: userId,
                name: payload.name,
                description: payload.description,
            });
        } catch (e) {
            const err = e.message ? e.message : JSON.stringify(e);
            this.logger.error(`Failed to create a project ${err}`);
			throw e
        }
    }

    async updateProject(
        userId: number,
        projectId: string,
        payload: UpdateProjectDto,
    ): Promise<QueryReturnType<Project>> {
        try {
            const project = await this.projectsRepository.update(payload, {
                where: { id: projectId, owned_by: userId },
                returning: true,
            });

            if (project[0] === 0)
                throw new NotFoundException('Project not found');

            return project;
        } catch (e) {
            const err = e.message ? e.message : JSON.stringify(e);
            this.logger.error(
                `Failed to update project with id ${projectId}, err: ${err}`,
            );
            throw e;
        }
    }

    async deleteProject(userId: number, projectId: string): Promise<number> {
        try {
            const count = await this.projectsRepository.destroy({
                where: { id: projectId, owned_by: userId },
            });

            if (count === 0) throw new NotFoundException('Project not found');

            return count;
        } catch (e) {
            const err = e.message ? e.message : JSON.stringify(e);
            this.logger.error(
                `Failed to delete project with id ${projectId}, err: ${err}`,
            );
            throw e;
        }
    }

    async createTask(projectId: string, payload: CreateTaskDto): Promise<Task> {
        try {
            const project = await this.projectsRepository.findOne({
                where: { id: projectId },
            });

            if (!project) {
                throw new NotFoundException('Project not found');
            }

            const task = await this.taskService.createTask(projectId, payload);

            // Throw it in the Queue
            // We don't want to await here because we don't care about
            // waiting for it to finish, we just want to throw the process
            // and return the created task to the user
            this.projectQueue.add(process.env.ADD_TASK_PROCESS_NAME, task);

            return task;
        } catch (e) {
            const err = e.message ? e.message : JSON.stringify(e);
            this.logger.error(
                `Failed to create a task for project with id ${projectId}, err: ${err}`,
            );
            throw e;
        }
    }

    async getProjectTasks(projectId: string): Promise<Task[]> {
        try {
            const project = await this.projectsRepository.findOne({
                where: { id: projectId },
            });

            if (!project) {
                throw new NotFoundException('Project not found');
            }

            return await this.taskService.getProjectTasks(projectId);
        } catch (e) {
            const err = e.message ? e.message : JSON.stringify(e);
            this.logger.error(
                `Failed to get tasks for project with id ${projectId}, err: ${err}`,
            );
            throw e;
        }
    }

    async deleteTask(projectId: string, taskId: string): Promise<number> {
        try {
            // Throw it in the Queue
            // We don't want to await here because we don't care about
            // waiting for it to finish, we just want to throw the process
            // and return the result from the db call
            this.projectQueue.add(process.env.ADD_TASK_PROCESS_NAME, taskId);

            return await this.taskService.deleteTask(projectId, taskId);
        } catch (e) {
            const err = e.message ? e.message : JSON.stringify(e);
            this.logger.error(
                `Failed to get tasks for project with id ${projectId}, err: ${err}`,
            );
            throw e;
        }
    }
}
