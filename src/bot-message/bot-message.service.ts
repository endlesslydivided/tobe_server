import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { BotMessage } from './diary-entry.model';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { CreateBotMessageDto } from './dto/createBotMessage.dto';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';

@Injectable()
export class BotMessageService {

    private logger: Logger = new Logger('BotMessageService');

    constructor(@InjectModel(BotMessage) private botMessageRepository: typeof BotMessage,
    @InjectConnection() private readonly sequelizeInstance: Sequelize)
    {}

    async createBotMessage(dto: CreateBotMessageDto) 
    {   
        const transaction: Transaction = await this.sequelizeInstance.transaction();
        const botMessage = await this.botMessageRepository.create(dto)
        .catch((error) => {
            this.logger.error(`Bot message is not created: ${error.message}`);
            transaction.rollback();
            throw new InternalServerErrorException("Bot message is not created.Internal server error");
        });        
        transaction.commit();
        return botMessage;
    }
}



