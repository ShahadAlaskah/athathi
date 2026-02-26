import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProviderService {
    constructor(private prisma: PrismaService) { }

    async findOne(id: string) {
        const provider = await this.prisma.provider.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        fullName: true,
                        email: true,
                        createdAt: true,
                    }
                },
                offers: {
                    take: 5,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        request: {
                            select: {
                                title: true,
                                city: true
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        orders: true,
                        offers: true
                    }
                }
            }
        });

        if (!provider) {
            throw new NotFoundException('مقدم الخدمة غير موجود');
        }

        return provider;
    }
}
