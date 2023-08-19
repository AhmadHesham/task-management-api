export interface CreateProjectsDto {
	name: string;
	description: string;
};

export interface UpdateProjectDto {
	projectId: string;
	name: string | undefined;
	description: string | undefined;
}
