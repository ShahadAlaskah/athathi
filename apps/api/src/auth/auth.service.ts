import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(dto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                fullName: dto.fullName,
                role: dto.role,
            },
        });

        if (dto.role === 'PROVIDER') {
            await this.prisma.provider.create({
                data: {
                    userId: user.id,
                    factoryName: dto.fullName, // Default to name
                    city: 'Riyadh', // Default
                }
            });
        }

        return this.generateTokens(user);
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (!user) throw new UnauthorizedException('Credentials incorrect');

        const pwMatches = await bcrypt.compare(dto.password, user.password);
        if (!pwMatches) throw new UnauthorizedException('Credentials incorrect');

        return this.generateTokens(user);
    }

    private generateTokens(user: any) {
        const payload = { id: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
            }
        };
    }
}
