import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialog } from '../dialog/dialog.model';
import { DiaryEntry } from '../diary-entry/diary-entry.model';
import { Media } from '../media/media.model';
import { MediaModule } from '../media/media.module';
import { FavoriteMessage } from '../message/favoriteMessage.model';
import { Message } from '../message/message.model';
import { MessageMood } from '../message/messageMood.model';
import { Subscription } from '../subscription/subscription.model';
import { LikedTweet } from '../tweet/likedTweet.model';
import { SavedTweet } from '../tweet/savedTweet.model';
import { Tweet } from '../tweet/tweet.model';
import { MentalCounts } from './mentalCount.model';
import { UserController } from './user.controller';
import { User } from './user.model';
import { UserService } from './user.service';
import { UserCounts } from './userCounts.model';

@Module({
  
  providers: [UserService],
  controllers: [UserController],
  imports:[
    MediaModule,
    SequelizeModule.forFeature([
      Tweet, User, SavedTweet,LikedTweet,Subscription,Media, Message,Dialog,UserCounts,FavoriteMessage,
      DiaryEntry,MessageMood, MentalCounts]),
  ],
  exports:[
    UserService
  ]
})
export class UserModule {}
