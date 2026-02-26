import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsEmail({}, { message: 'البريد الإلكتروني غير صحيح' })
    @IsNotEmpty({ message: 'البريد الإلكتروني مطلوب' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' })
    @IsNotEmpty({ message: 'كلمة المرور مطلوبة' })
    password: string;

    @IsString()
    @IsNotEmpty({ message: 'الاسم الكامل مطلوب' })
    fullName: string;

    @IsEnum(Role, { message: 'نوع الحساب غير صحيح' })
    @IsNotEmpty({ message: 'نوع الحساب مطلوب' })
    role: Role;
}

export class LoginDto {
    @IsEmail({}, { message: 'البريد الإلكتروني غير صحيح' })
    @IsNotEmpty({ message: 'البريد الإلكتروني مطلوب' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'كلمة المرور مطلوبة' })
    password: string;
}
