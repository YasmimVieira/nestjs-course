import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageFormatterService {
    public format(message: string): string {
        const timestamp = new Date().toISOString();

        return `[${timestamp}] ${message}`
    }
}
