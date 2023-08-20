import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateTaskDto } from 'src/task/dto/task.dto';
import { buildResponse } from 'src/util/http/ResponseBuilder';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
    constructor(private projectService: ProjectService) {}

    @Get()
    @UseGuards(AuthGuard)
    async findAllProjects(@Request() request) {
        const data = await this.projectService.findAllProjects(
            request.user.sub,
        );
        return buildResponse(data);
    }

    @Post()
    @UseGuards(AuthGuard)
    async createProject(@Request() request, @Body() payload: CreateProjectDto) {
        const data = await this.projectService.createProject(
            payload,
            request.user.sub,
        );
        return buildResponse(data);
    }

    @Put(':projectId')
    @UseGuards(AuthGuard)
    async updateProject(
        @Request() request,
        @Param('projectId') projectId: string,
        @Body() payload: UpdateProjectDto,
    ) {
        const data = await this.projectService.updateProject(
            request.user.sub,
            projectId,
            payload,
        );

        return buildResponse(data);
    }

    @Delete(':projectId')
    @UseGuards(AuthGuard)
    async deleteProject(
        @Request() request,
        @Param('projectId') projectId: string,
    ) {
        const data = await this.projectService.deleteProject(
            request.user.sub,
            projectId,
        );
        return buildResponse(data);
    }

    @Post(':projectId/tasks')
    @UseGuards(AuthGuard)
    async createTask(
        @Request() request,
        @Param('projectId') projectId: string,
        @Body() payload: CreateTaskDto,
    ) {
        const data = await this.projectService.createTask(projectId, payload);
        return buildResponse(data);
    }

    @Get(':projectId/tasks')
    @UseGuards(AuthGuard)
    async getProjectTasks(
        @Request() request,
        @Param('projectId') projectId: string,
    ) {
        const data = await this.projectService.getProjectTasks(projectId);
        return buildResponse(data);
    }

    @Delete(':projectId/tasks/:taskId')
    @UseGuards(AuthGuard)
    async deleteTask(
        @Request() request,
        @Param('projectId') projectId: string,
        @Param('taskId') taskId: string,
    ) {
        const data = await this.projectService.deleteTask(projectId, taskId);
        return buildResponse(data);
    }
}
