import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/task.dto';
import { Task } from './entity/task.model';

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task) private tasksRepository: typeof Task) {}

    createTask(projectId: string, payload: CreateTaskDto): Promise<Task> {
        const query = {
            name: payload.name,
            description: payload.description,
            project_id: projectId,
        };
        return this.tasksRepository.create(query);
    }

    getProjectTasks(projectId: string): Promise<Task[]> {
        const query = { where: { project_id: projectId } };
        return this.tasksRepository.findAll(query);
    }

    async deleteTask(projectId: string, taskId: string): Promise<number> {
        const query = {
            where: {
                id: taskId,
                project_id: projectId,
            },
        };

        const count = await this.tasksRepository.destroy(query);
		if (count === 0)
			throw new NotFoundException("Task not found");

		return count;
    }
}
