import { Body, Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { OfferService } from './offer.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { CreateOfferDto } from './dto/create-offer.dto';

@Controller('offers')
@UseGuards(JwtAuthGuard)
export class OfferController {
    constructor(private readonly offerService: OfferService) { }

    @Post()
    create(@Body() dto: CreateOfferDto, @GetUser('id') userId: string) {
        return this.offerService.create(dto, userId);
    }

    @Get('me')
    getMyOffers(@GetUser('id') userId: string) {
        return this.offerService.findByUser(userId);
    }

    @Get('me/stats')
    getMyStats(@GetUser('id') userId: string) {
        return this.offerService.getStats(userId);
    }

    @Post(':id/accept')
    acceptOffer(@Param('id') id: string, @GetUser('id') clientId: string) {
        return this.offerService.accept(id, clientId);
    }
}
