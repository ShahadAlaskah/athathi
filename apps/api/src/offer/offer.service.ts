import { ForbiddenException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { RequestStatus, OrderStatus } from '@prisma/client';

@Injectable()
export class OfferService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateOfferDto, userId: string) {
        const provider = await this.prisma.provider.findUnique({
            where: { userId }
        });

        if (!provider) {
            throw new ForbiddenException('Only registered providers can submit offers');
        }

        const request = await this.prisma.furnitureRequest.findUnique({
            where: { id: dto.requestId }
        });

        if (!request) {
            throw new NotFoundException('Request not found');
        }

        return this.prisma.offer.create({
            data: {
                ...dto,
                providerId: provider.id,
                userId: userId,
                status: 'PENDING',
                conversation: {
                    create: {}
                }
            }
        });
    }

    async findByUser(userId: string) {
        return this.prisma.offer.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                request: {
                    select: {
                        id: true,
                        title: true,
                        city: true,
                        status: true,
                    }
                }
            }
        });
    }

    async getStats(userId: string) {
        const offers = await this.prisma.offer.findMany({
            where: { userId },
            select: { status: true, price: true }
        });

        return {
            total: offers.length,
            accepted: offers.filter(o => o.status === 'ACCEPTED').length,
            pending: offers.filter(o => o.status === 'PENDING').length,
            totalValue: offers.filter(o => o.status === 'ACCEPTED').reduce((sum, o) => sum + o.price, 0)
        };
    }

    async accept(offerId: string, clientId: string) {
        const offer = await this.prisma.offer.findUnique({
            where: { id: offerId },
            include: { request: true }
        });

        if (!offer) throw new NotFoundException('Offer not found');
        if (offer.request.clientId !== clientId) throw new ForbiddenException('Only the request owner can accept offers');
        if (offer.status !== 'PENDING') throw new BadRequestException('Offer is already processed');

        return this.prisma.$transaction(async (tx) => {
            // Update the accepted offer
            const updatedOffer = await tx.offer.update({
                where: { id: offerId },
                data: { status: 'ACCEPTED' }
            });

            // Update the request status
            await tx.furnitureRequest.update({
                where: { id: offer.requestId },
                data: { status: RequestStatus.ACCEPTED }
            });

            // Create an order
            const order = await tx.order.create({
                data: {
                    offerId: updatedOffer.id,
                    providerId: offer.providerId,
                    totalAmount: offer.price,
                    status: OrderStatus.ACCEPTED
                }
            });

            return { updatedOffer, order };
        });
    }
}
