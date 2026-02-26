import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
    constructor(private prisma: PrismaService) { }

    @Get('offer/:offerId')
    async getOfferMessages(@Param('offerId') offerId: string, @GetUser('id') userId: string) {
        const conversation = await this.prisma.conversation.findUnique({
            where: { offerId },
            include: {
                offer: {
                    select: {
                        userId: true, // Provider's userId
                        request: { select: { clientId: true } }
                    }
                },
                messages: {
                    include: { sender: { select: { fullName: true } } },
                    orderBy: { createdAt: 'asc' }
                }
            }
        });

        if (!conversation) return [];

        // Security check: only client or provider can see messages
        if (conversation.offer.userId !== userId && conversation.offer.request.clientId !== userId) {
            return [];
        }

        return conversation.messages;
    }
}
