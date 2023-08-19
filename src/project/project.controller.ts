import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProjectsDto, UpdateProjectDto } from './dto/project.dto';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
    constructor(private projectService: ProjectService) {}

    @Get()
    @UseGuards(AuthGuard)
    async findAll(@Request() request) {
        return this.projectService.findAll(request.user.sub);
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Request() request, @Body() payload: CreateProjectsDto) {
        return await this.projectService.create(payload, request.user.sub);
    }

    @Put()
    @UseGuards(AuthGuard)
    async update(@Request() request, @Body() payload: UpdateProjectDto) {
        return await this.projectService.update(payload);
    }
}
