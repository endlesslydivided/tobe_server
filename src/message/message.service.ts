import { forwardRef, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import sequelize, { Op, Sequelize } from 'sequelize';
import { Transaction } from 'sequelize';
import { Media } from '../media/media.model';
import { MediaService } from '../media/media.service';
import { Tweet } from '../tweet/tweet.model';
import { TweetCounts } from '../tweet/tweetcounts.model';
import { User } from '../user/user.model';
import { CreateMessageDto } from './dto/createMessage.dto';
import { UpdateMessageDto } from './dto/updateMessage.dto';
import { Message } from './message.model';
import { CreateMessageMoodDto } from './dto/createMessageMood.dto';
import { MessageMood } from './messageMood.model';

@Injectable()
export class MessageService {

    private logger: Logger = new Logger('MessageService');

    constructor(@InjectModel(Message) private messageRepository: typeof Message,
    @InjectModel(MessageMood) private messageMoodRepository: typeof MessageMood,
    @Inject(forwardRef(() => MediaService)) private mediaService: MediaService,
    @InjectConnection() private readonly sequelizeInstance: Sequelize) {}

      
    async createMessage(files: Array<any>,dto: CreateMessageDto) 
    {   

      const transaction: Transaction = await this.sequelizeInstance.transaction();

      const message =  await this.messageRepository.create(dto, {returning:true,transaction})
        .catch((error) => {
        this.logger.error(`Message is not created: ${error.message}`);
        transaction.rollback();
        throw new InternalServerErrorException("Message is not created.Internal server error");
      }); 

      if(files && files.length !== 0)
      {
          await this.mediaService.createMessageMedia(files, message.id,transaction)
          .catch((error) => 
          {
              this.logger.error(`Message is not created:${error.message}`);
              transaction.rollback();
              throw new InternalServerErrorException("Error occured during media creation. Internal server error.");
          });  
      }
      transaction.commit();
      return message;
    }

    async createMessageMood(dto: CreateMessageMoodDto) 
    {   

      const transaction: Transaction = await this.sequelizeInstance.transaction();
      const {messageId,userId} = dto;
      const messageMood = await this.messageMoodRepository.findOne({where:{[Op.and]:{messageId,userId}},transaction}).then((entry)=>
      {
        if(entry)
          return entry.update(dto);
          
        return this.messageMoodRepository.create(dto);
      }) 
      .catch((error) => {
        this.logger.error(`Message mood is not created: ${error.message}`);
        transaction.rollback();
        throw new InternalServerErrorException("Message mood is not created.Internal server error");
      });        
      transaction.commit();
      return messageMood;
    }

    async getOneMessage(id: string) {

      const message = await this.messageRepository.findByPk(id,{include:[
        {model:Media, required:false},
        {model:Tweet, required:false, include:[
          {model: TweetCounts},
          {model: Media,as:'tweetMedia', required:false},
          {model: Tweet,as:'parentRecord',required:false,include:
          [
              {model: Media,as:'tweetMedia', required:false},
              {model: TweetCounts,on:{"tweetId": {[Op.eq]: Sequelize.col('messageTweet.parentRecord.id')}}},
              {model: User,as:'author',include: [{model:Media,as:"mainPhoto"}],attributes:["id","firstname","surname","country","city"]},
          ]},
          {model: User,as:'author',include: [{model:Media,as:"mainPhoto"}],attributes:["id","firstname","surname","country","city"]}
        ]}
      ]}).catch((error) => {
        this.logger.error(`Message is not found: ${error.message}`);
        throw new InternalServerErrorException("Message is not found.Internal server error");
      });
  
      return message;
    }
  
    async updateMessage(id: string, dto: UpdateMessageDto) {

      const message = await this.messageRepository.update(dto, { where: { id },returning:true }).catch((error) => {
        this.logger.error(`Message is not updated: ${error.message}`);
        throw new InternalServerErrorException("Message is not updated.Internal server error");
      });
  
      return message;
    }

    async deleteMessage(id: string) 
    {
        return await this.messageRepository.destroy({ where: { id } }).catch((error) => {
          this.logger.error(`Message is not deleted: ${error.message}`);
          throw new InternalServerErrorException("Message is not deleted.Internal server error");
        });;
    }

    async bulkDeleteMessages(ids:Array<string>) 
    {
        return await this.messageRepository.destroy({ where: { id:{[Op.in] : ids} } }).catch((error) => {
          this.logger.error(`Messages are not deleted: ${error.message}`);
          throw new InternalServerErrorException("Messages are not deleted.Internal server error");
        });;
    }
}
