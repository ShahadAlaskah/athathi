import { Controller, Get, Param } from '@nestjs/common';
import { ProviderService } from './provider.service';

@Controller('providers')
export class ProviderController {
    constructor(private providerService: ProviderService) { }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.providerService.findOne(id);
    }
}
