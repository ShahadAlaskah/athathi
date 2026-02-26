import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RequestStatus } from '@prisma/client';
import { CreateRequestDto } from './dto/create-request.dto';

@Injectable()
export class RequestService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateRequestDto, clientId: string) {
        const { images, ...data } = dto;
        return this.prisma.furnitureRequest.create({
            data: {
                ...data,
                clientId,
                deadline: data.deadline ? new Date(data.deadline) : null,
                status: RequestStatus.PENDING,
                images: {
                    create: images?.map(url => ({ url }))
                }
            },
            include: { images: true }
        });
    }

    async findAll(params: { city?: string; category?: string; page: number; limit: number }) {
        const { city, category, page, limit } = params;
        const skip = (page - 1) * limit;

        const where: any = {
            ...(city && { city }),
            ...(category && { category }),
            status: RequestStatus.PENDING
        };

        const [items, total] = await Promise.all([
            this.prisma.furnitureRequest.findMany({
                where,
                skip,
                take: +limit,
                orderBy: { createdAt: 'desc' },
                include: { images: true, _count: { select: { offers: true } } }
            }),
            this.prisma.furnitureRequest.count({ where })
        ]);

        return { items, total, page, lastPage: Math.ceil(total / limit) };
    }

    async findByUser(userId: string) {
        return this.prisma.furnitureRequest.findMany({
            where: { clientId: userId },
            orderBy: { createdAt: 'desc' },
            include: {
                _count: { select: { offers: true } },
                images: { take: 1 }
            }
        });
    }

    async findOne(id: string) {
        const request = await this.prisma.furnitureRequest.findUnique({
            where: { id },
            include: {
                client: { select: { fullName: true, id: true } },
                images: true,
                offers: {
                    include: { provider: true }
                }
            }
        });

        if (!request) throw new NotFoundException('Request not found');
        return request;
    }
}
