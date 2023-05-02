import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MediaModule } from '../media/media.module';
import { FavoriteMessage } from './favoriteMessage.model';
import { Message } from './message.model';
import { MessageService } from './message.service';
import { MessageMood } from './messageMood.model';
import { MessageController } from './message.controller';

@Module({
  providers: [MessageService],
  imports:[MediaModule,SequelizeModule.forFeature([Message,FavoriteMessage,MessageMood])],
  exports:[MessageService],
  controllers: [MessageController]
})
export class MessageModule {}
