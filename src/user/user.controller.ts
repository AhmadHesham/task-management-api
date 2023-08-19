import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
	@HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: UserDto) {
        return await this.userService.create(payload);
    }

	@Get()
	@HttpCode(HttpStatus.OK)
	async findAll() {
		return await this.userService.findAll();
	}
}
