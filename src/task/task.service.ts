import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/task.dto';
import { Task } from './entity/task.model';

@Injectable()
export class TaskService {
    private readonly logger = new Logger(TaskService.name);

    constructor(@InjectModel(Task) private tasksRepository: typeof Task) {}

    createTask(projectId: string, payload: CreateTaskDto): Promise<Task> {
        try {
            const query = {
                name: payload.name,
                description: payload.description,
                project_id: projectId,
            };
            return this.tasksRepository.create(query);
        } catch (e) {
            // This part is just for developer logging
            // When this is developed to a cloud provider
            // like gcp for example, we want to check the err
            // in the logs, so this is useful for such a case
            const err = e.message ? e.message : JSON.stringify(e);
            this.logger.error(`Failed to create a task ${err}`);

            // Throw e again so that nest can handle it
            // And set the appropriate error code
            throw e;
        }
    }

    getProjectTasks(projectId: string): Promise<Task[]> {
        try {
            const query = { where: { project_id: projectId } };
            return this.tasksRepository.findAll(query);
        } catch (e) {
            const err = e.message ? e.message : JSON.stringify(e);
            this.logger.error(`Failed to get tasks ${err}`);

            throw e;
        }
    }

    async deleteTask(projectId: string, taskId: string): Promise<number> {
        try {
            const query = {
                where: {
                    id: taskId,
                    project_id: projectId,
                },
            };

            const count = await this.tasksRepository.destroy(query);
            if (count === 0) throw new NotFoundException('Task not found');

            return count;
        } catch (e) {
            const err = e.message ? e.message : JSON.stringify(e);
            this.logger.error(`Failed to delete task ${err}`);
            throw e;
        }
    }
}
