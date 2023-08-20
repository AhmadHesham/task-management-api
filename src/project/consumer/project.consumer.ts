import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

@Processor(process.env.PROJECTS_QUEUE_NAME)
export class ProjectConsumer {
    private readonly logger = new Logger(ProjectConsumer.name);

    @Process(process.env.ADD_TASK_PROCESS_NAME)
    async processAddTask(job: Job) {
        this.logger.log(
            `Processing job ${job.id} ${job.name} with data ${JSON.stringify(job.data)}`,
        );

        return;
    }
}
