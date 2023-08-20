import { IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;
}

export class UpdateProjectDto {
    name: string | undefined;
    description: string | undefined;
}
