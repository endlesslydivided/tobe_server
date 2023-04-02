import { Module } from '@nestjs/common';
import { BotMessageController } from './bot-message.controller';
import { BotMessageService } from './bot-message.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BotMessage } from './diary-entry.model';

@Module({
  controllers: [BotMessageController],
  imports:[SequelizeModule.forFeature([BotMessage])],
  providers: [BotMessageService]
})
export class BotMessageModule {}
