import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRegister } from '../user-controller/user-dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {
  QueryDataDto,
  QueryGetAllChats,
} from '../user-controller/user-dto/query.dto';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async CreateUser(requestBody: any) {
    try {
      const { userName, password, confirmation_pass } = requestBody;
      if (password !== confirmation_pass) {
        throw new HttpException(
          'Passwords dose not match',
          HttpStatus.CONFLICT,
        );
      }

      const user = await this.prismaService.user.findUnique({
        where: { userName },
      });
      if (user) {
        throw new HttpException('User already exits', HttpStatus.CONFLICT);
      }

      const hashedPass = await bcrypt.hashSync(password, 10);
      const newuser = await this.prismaService.user.create({
        data: {
          password: hashedPass,
          userName,
        },
      });

      return {
        token: this.JWTtoken(newuser),
        message: 'User Has Been Registered',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async SingInUser(requestBody: any) {
    const { userName, password } = requestBody;

    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          userName,
        },
      });

      if (!user) {
        throw new HttpException('User  Dose Not Exists', HttpStatus.NOT_FOUND);
      }

      let decreptPass = bcrypt.compare(password, user.password);

      if (!decreptPass) {
        throw new HttpException('Password is incorrect', HttpStatus.CONFLICT);
      }
      user.password = null;
      return {
        token: this.JWTtoken(user),
        message: 'User Has Been Signed In',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAllusers(query: QueryDataDto) {
    const { search } = query;
    try {
      const userInfo = await this.prismaService.user.findMany({
        select: {
          userName: true,
          id: true,
        },
        where: {
          userName: {
            contains: search,
            mode: 'insensitive',
          },
        },
      });

      return { data: userInfo };
    } catch (error) {
      throw new Error(error);
    }
  }

  async GetAllUserMessages(query: QueryGetAllChats) {
    const { Receiver_id, Sender_id } = query;
    try {
      const chatRoom = await this.prismaService.chat.findMany({
        where: {
          partyMembers: {
            hasEvery: [Sender_id, Receiver_id],
          },
        },
      });
      if (!chatRoom) {
        return { data: [], msg: 'NO CHAT' };
      }
      return { data: chatRoom };
    } catch (error) {}
  }
  private JWTtoken(token: object) {
    return jwt.sign(token, 'jwtsdfsd', { expiresIn: '1y' });
  }
}
