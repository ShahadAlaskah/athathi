import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsArray, IsDateString } from 'class-validator';

export class CreateRequestDto {
    @IsString()
    @IsNotEmpty({ message: 'العنوان مطلوب' })
    title: string;

    @IsString()
    @IsNotEmpty({ message: 'الوصف مطلوب' })
    description: string;

    @IsString()
    @IsNotEmpty({ message: 'التصنيف مطلوب' })
    category: string;

    @IsString()
    @IsNotEmpty({ message: 'المقاسات مطلوبة' })
    dimensions: string;

    @IsString()
    @IsOptional()
    material?: string;

    @IsString()
    @IsOptional()
    color?: string;

    @IsNumber()
    @IsOptional()
    quantity?: number;

    @IsString()
    @IsNotEmpty({ message: 'المدينة مطلوبة' })
    city: string;

    @IsNumber()
    @IsOptional()
    budget?: number;

    @IsDateString()
    @IsOptional()
    deadline?: string;

    @IsBoolean()
    @IsOptional()
    withInstallation?: boolean;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    images?: string[];
}
