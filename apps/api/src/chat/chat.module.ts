import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    providers: [ChatGateway],
    controllers: [ChatController],
})
export class ChatModule { }
