import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageFormatterService } from './services/message-formatter/message-formatter.service';
import { LoggerService } from './services/logger/logger.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MessageFormatterService, LoggerService],
})
export class AppModule {}
