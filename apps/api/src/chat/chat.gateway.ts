import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';
import { PrismaService } from '../prisma/prisma.service';

@WebSocketGateway({
    cors: { origin: '*' },
    namespace: 'chat',
})
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    constructor(private prisma: PrismaService) { }

    @UseGuards(WsJwtGuard)
    @SubscribeMessage('joinOffer')
    handleJoinRoom(@MessageBody('offerId') offerId: string, @ConnectedSocket() client: Socket) {
        client.join(`offer_${offerId}`);
    }

    @UseGuards(WsJwtGuard)
    @SubscribeMessage('sendMessage')
    async handleMessage(
        @MessageBody() data: { offerId: string; content: string },
        @ConnectedSocket() client: Socket,
    ) {
        const user = client.data.user;

        // Find or check conversation
        const conversation = await this.prisma.conversation.findUnique({
            where: { offerId: data.offerId }
        });

        if (!conversation) return;

        const message = await this.prisma.message.create({
            data: {
                conversationId: conversation.id,
                senderId: user.id,
                content: data.content,
            },
            include: { sender: { select: { fullName: true } } }
        });

        this.server.to(`offer_${data.offerId}`).emit('newMessage', message);
        return message;
    }
}
