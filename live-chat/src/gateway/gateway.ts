import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import cors from 'cors';
import { Server } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
@Injectable()
export class MyGateWay implements OnModuleInit {
  constructor(private prismaService: PrismaService) {}
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() body: any) {
    console.log(body);
    const { message, Receiver_id, Sender_id, partyMembers } = body;
    const newMessage = await this.prismaService.chat.create({
      data: { Receiver_id, Sender_id, message, partyMembers },
    });
    console.log(newMessage);
    this.server.emit('onMessage', {
      content: newMessage,
    });
  }
}
