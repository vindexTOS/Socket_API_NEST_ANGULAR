import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserRegister } from './user-dto/user.dto';
import { UserService } from '../user-service/user.service';
import { QueryDataDto, QueryGetAllChats } from './user-dto/query.dto';
import { query } from 'express';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(201)
  createUser(@Body() requestBody: any) {
    return this.userService.CreateUser(requestBody);
  }

  @Post('singin')
  @HttpCode(200)
  signUserin(@Body() requestBody: any) {
    console.log(requestBody);
    return this.userService.SingInUser(requestBody);
  }

  @Get('getallusers')
  @HttpCode(200)
  getAllUsers(@Query() query: QueryDataDto) {
    return this.userService.getAllusers(query);
  }

  @Get('chat')
  @HttpCode(200)
  getAllChats(@Query() query: QueryGetAllChats) {
    console.log(query);
    return this.userService.GetAllUserMessages(query);
  }
}
