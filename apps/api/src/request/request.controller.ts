import { Controller, Get, Post, Body, UseGuards, Query, Param } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('requests')
export class RequestController {
    constructor(private readonly requestService: RequestService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.CLIENT)
    create(@Body() createRequestDto: CreateRequestDto, @GetUser('id') userId: string) {
        return this.requestService.create(createRequestDto, userId);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getMyRequests(@GetUser('id') userId: string) {
        return this.requestService.findByUser(userId);
    }

    @Get()
    findAll(
        @Query('city') city?: string,
        @Query('category') category?: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return this.requestService.findAll({ city, category, page, limit });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.requestService.findOne(id);
    }
}
