import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { BotMessage } from './diary-entry.model';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { CreateBotMessageDto } from './dto/createBotMessage.dto';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
  });
const openai = new OpenAIApi(configuration);

@Injectable()
export class BotMessageService {

    private logger: Logger = new Logger('BotMessageService');

    constructor(@InjectModel(BotMessage) private botMessageRepository: typeof BotMessage,
    @InjectConnection() private readonly sequelizeInstance: Sequelize)
    {}

    async createBotMessage(dto: CreateBotMessageDto) 
    {   
        const text = dto.text;
        const userId = dto.userId;

        const previousMessages = await this.botMessageRepository.findAll({where:{userId}})
        let allMessages = previousMessages.reduce((a:any,c:any) =>
        {
            if(c.isNeuralGenerated)
            {
                a += `AI:${c.text}\n`;
            }
            else
            {
                a += `Human:${c.text}\n`;
            }
        },'')
        allMessages += `Human:${text}\n`;
        const response = await openai.Completion.create({
            model: "text-davinci-004",
            prompt: `
                The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.

                ${allMessages}`,
            max_tokens: 250,
            temperature: 0,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: [" Human:", " AI:"],
        }).catch((error:any) =>
        {
            throw new InternalServerErrorException('Some error occured on server');
        });

        const transaction: Transaction = await this.sequelizeInstance.transaction();
        const userMessage = await this.botMessageRepository.create(dto)
        .catch((error) => {
            this.logger.error(`Bot message is not created: ${error.message}`);
            transaction.rollback();
            throw new InternalServerErrorException("Bot message is not created.Internal server error");
        }); 
        const botMessage = await this.botMessageRepository.create(
            {
                text:response.data.choices[0].text,
                isNeuralGenerated:true,
                isTalkingSession:true,
                userId
            }
        )
        .catch((error) => {
            this.logger.error(`Bot message is not created: ${error.message}`);
            transaction.rollback();
            throw new InternalServerErrorException("Bot message is not created.Internal server error");
        });       
        transaction.commit();
        return {userMessage,botMessage};
    }

   
}



