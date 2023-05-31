import { ApiProperty } from "@nestjs/swagger";
import {BelongsTo,BelongsToMany,Column,CreatedAt,DataType,Default,ForeignKey,HasMany,HasOne,Model,Table, UpdatedAt} from "sequelize-typescript";
import { Dialog } from "../dialog/dialog.model";
import { UserDialog } from "../dialog/userDialog.model";
import { Media } from "../media/media.model";
import { FavoriteMessage } from "../message/favoriteMessage.model";
import { Message } from "../message/message.model";
import { Subscription } from "../subscription/subscription.model";
import { LikedTweet } from "../tweet/likedTweet.model";
import { SavedTweet } from "../tweet/savedTweet.model";
import { Tweet } from "../tweet/tweet.model";
import { UserCounts } from "./userCounts.model";
import { MessageMood } from "../message/messageMood.model";
import { DiaryEntry } from "../diary-entry/diary-entry.model";
import { MentalCounts } from "./mentalCount.model";

  
interface UserCreationAttribute {
    firstname: string;
    emailConfirmed: boolean;
    surname: string;
    email: string;
    password: string;
    salt: string;
    sex:string;
    country:string;
    city:string;
}
  
@Table({tableName:'user'})
export class User extends Model<User,UserCreationAttribute> 
{
    @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", description: "Unique user identifier" })
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID, allowNull:false, primaryKey: true })
    id: string;

    @ApiProperty({ example: "Alexander", description: "User's firstname" })
    @Column({ type: DataType.STRING, allowNull: false })
    firstname: string;

    @ApiProperty({ example: "Kovalyov", description: "User's lastname" })
    @Column({ type: DataType.STRING, allowNull: false })
    surname: string;

    @ApiProperty({ example: "Welcome to my page!", description: "User's profile description" })
    @Column({ type: DataType.STRING, allowNull: true })
    description: string;

    @ApiProperty({ example: "user@do.mail", description: "User's email" })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: "false", description: "Is user's email confirmed?" })
    @Default(false)
    @Column({ type: DataType.BOOLEAN, allowNull: false })
    emailConfirmed: boolean;
  
    @ApiProperty({ example: "12345", description: "User's password hash" })
    @Column({ type: DataType.STRING, unique: false, allowNull: false })
    password: string;

    @ApiProperty({ example: "12345", description: "User's password hash salt" })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    salt: string;

    @ApiProperty({ example: "Man", description: "Sex" })
    @Column({ type: DataType.STRING, allowNull: false})
    sex: string;

    @ApiProperty({ example: "Belarus", description: "User's country of living" })
    @Column({ type: DataType.STRING, allowNull: false})
    country: string;

    @ApiProperty({ example: "Minsk", description: "User's city of living" })
    @Column({ type: DataType.STRING, allowNull: false})
    city: string;

    @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", description: "Failed attempts to access user's account" })
    @Default(0)
    @Column({ type: DataType.INTEGER })
    accessFailedCount: number;

    @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", description: "ID of main photo" })
    @ForeignKey(/* istanbul ignore next */  () => Media)
    @Column({ type: DataType.UUID })
    mainPhotoId: string;

    @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", description: "ID of profile photo" })
    @ForeignKey(/* istanbul ignore next */  () => Media)
    @Column({ type: DataType.UUID })
    profilePhotoId: string;

    //User's tweets
    @HasMany(/* istanbul ignore next */  () => Tweet,{as:'tweets',foreignKey:'authorId'})
    tweets: Tweet[]

    @HasMany(/* istanbul ignore next */  () => Tweet,"parentRecordAuthorId")
    userTweetsComments: Tweet[]

    //User's saved and liked tweets
    @BelongsToMany(/* istanbul ignore next */  () => Tweet, /* istanbul ignore next */  () => SavedTweet,"userId")
    savedTweets: Tweet[];

    @BelongsToMany(/* istanbul ignore next */  () => Tweet, /* istanbul ignore next */  () => LikedTweet,"userId")
    likedTweets: Tweet[];

    //User's subscribers and subcribtions
    @HasMany(/* istanbul ignore next */  () => Subscription,{as:'followers',foreignKey:'subscribedUserId'})
    followers: Subscription[]

    @HasMany(/* istanbul ignore next */  () => Subscription,{as:'following',foreignKey:'subscriberId'})
    subscriptions: User[];

    @BelongsTo(/* istanbul ignore next */  () => Media, {
        foreignKey: "mainPhotoId",
        constraints: false, onDelete: "set null", as:'mainPhoto'
      })
    mainPhoto: Media;

    @BelongsTo(/* istanbul ignore next */  () => Media, {
        foreignKey: "profilePhotoId",
        constraints: false, onDelete: "set null", as:'profilePhoto'
      })
    profilePhoto: Media;

    @BelongsToMany(/* istanbul ignore next */  () => Dialog, /* istanbul ignore next */  () => UserDialog)
    dialogs: Dialog[];

    @HasMany(/* istanbul ignore next */  () => Dialog, {
        foreignKey: "creatorId",
        constraints: true, onDelete: "cascade", onUpdate: "cascade"
    })
    createdDialogs: Dialog[];

    @HasMany(/* istanbul ignore next */  () => Message, {
        foreignKey: "userId",
        constraints: true, onDelete: "set null", onUpdate: "cascade"
    })
    messages: Message[];

    @HasMany(/* istanbul ignore next */  () => UserDialog)
    userDialog: UserDialog[]

    @HasMany(/* istanbul ignore next */  () => Subscription,{as:"isSubscribed"})
    isSubscribed: Subscription;
    
    @HasMany(/* istanbul ignore next */  () => Subscription,{as:"isFollower"})
    isFollower: Subscription;

    @HasOne(/* istanbul ignore next */  () => UserCounts,{as:'counts',foreignKey:'userId'})
    counts: UserCounts

    @BelongsToMany(/* istanbul ignore next */  () => Message, /* istanbul ignore next */  () => FavoriteMessage,"userId")
    favoriteMessages: FavoriteMessage[];

    @HasMany(/* istanbul ignore next */  () => MessageMood, {
        foreignKey: "userId",
        constraints: true, onDelete: "set null", onUpdate: "cascade"
    })
    messagesMoods: MessageMood[];

    @HasMany(/* istanbul ignore next */  () => DiaryEntry, {
        foreignKey: "userId",
        constraints: true, onDelete: "set null", onUpdate: "cascade"
    })
    diaryEntries: DiaryEntry[];

    @HasOne(/* istanbul ignore next */  () => MentalCounts,{as:'mentalCounts',foreignKey:'userMoodId'})
    mentalCounts: MentalCounts
    
}