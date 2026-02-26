import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsJwtGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const client = context.switchToWs().getClient();
            const token = client.handshake?.auth?.token || client.handshake?.headers?.authorization?.split(' ')[1];

            if (!token) return false;

            const payload = await this.jwtService.verifyAsync(token);
            client.data.user = payload;

            return true;
        } catch {
            throw new WsException('Unauthorized');
        }
    }
}
