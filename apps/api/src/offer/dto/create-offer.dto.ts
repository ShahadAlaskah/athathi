import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateOfferDto {
    @IsString()
    @IsNotEmpty()
    requestId: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    estimatedDays: number;

    @IsString()
    @IsOptional()
    proposedMaterials?: string;

    @IsString()
    @IsOptional()
    warrantyInfo?: string;

    @IsBoolean()
    @IsOptional()
    deliveryIncluded?: boolean;

    @IsString()
    @IsOptional()
    paymentTerms?: string;
}
