import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { RequestModule } from './request/request.module';
import { OfferModule } from './offer/offer.module';
import { OrderModule } from './order/order.module';
import { ChatModule } from './chat/chat.module';
import { StripeModule } from './stripe/stripe.module';
import { StorageModule } from './storage/storage.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), 'uploads'),
            serveRoot: '/uploads',
        }),
        PrismaModule,
        AuthModule,
        UserModule,
        RequestModule,
        OfferModule,
        OrderModule,
        ChatModule,
        StripeModule,
        StorageModule,
    ],
})
export class AppModule { }
