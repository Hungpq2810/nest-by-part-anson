import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, Inject, Param, ParseIntPipe, Post, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUserDto';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from 'src/users/filters/HttpException.filter';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types';

@Controller('users')
export class UsersController {
    constructor(
        @Inject('USER_SERVICE') private readonly userService: UsersService
    ) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('username/:username')
    getUserByUsername(@Param('username') username: string){
        const user = this.userService.getUserByUsername(username);
        if (user) return new SerializedUser(user); 
        else throw new HttpException('User not found', 404);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseFilters(HttpExceptionFilter)
    @Get('id/:id')
    getUserById(@Param('id', ParseIntPipe) id: number){
        const user = this.userService.getUserById(id);
        if (user) return new SerializedUser(user);
        else throw new UserNotFoundException();
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createUser(@Body () data: CreateUserDto) {
        return this.userService.createUser(data);
    }
}
