import { BelongsTo, Column, DataType,HasOne,CreatedAt,UpdatedAt, ForeignKey, HasMany, Model, Table, Default, BelongsToMany } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../user/user.model";
import { Media } from "../media/media.model";
import { SavedTweet } from "./savedTweet.model";
import { LikedTweet } from "./likedTweet.model";
import { TweetCounts } from "./tweetcounts.model";
import { Message } from "../message/message.model";


interface TweetCreationAttribute {
  title: string;
  description: string;
  content: string;
  categoryId: number;
  userId: number;
}

@Table({ tableName: "twitterRecord",paranoid:true,deletedAt:true})
export class Tweet extends Model<Tweet, TweetCreationAttribute> {

    //Data fields
    @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", description: "Unique tweet identifier" })
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID, allowNull:false, primaryKey: true })
    id: string;

    @ApiProperty({ example: "My first post content", description: "Tweet text" })
    @Column({ type: DataType.TEXT, allowNull: true })
    text: string;

    @ApiProperty({ example: "false", description: "Is tweet a comment?" })
    @Column({ type: DataType.BOOLEAN, allowNull: false })
    isComment: boolean;

    @ApiProperty({ example: "false", description: "Is tweet public?" })
    @Column({ type: DataType.BOOLEAN, allowNull: false })
    isPublic: boolean;

    //Author foreign key
    @ApiProperty({ example: "0", description: "ID of tweet author" })
    @ForeignKey(/* istanbul ignore next */  () => User)
    @Column({ type: DataType.UUID, allowNull: true })
    authorId: string;

    @BelongsTo(/* istanbul ignore next */  () => User,{foreignKey:"authorId",constraints:true,onDelete:"SET NULL"})
    author: User;

    //Parent record author foreign key
    @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174001", description: "ID of tweet parent record author" })
    @ForeignKey(/* istanbul ignore next */  () => User)
    @Column({ type: DataType.UUID, allowNull: true })
    parentRecordAuthorId: string;

    @BelongsTo(/* istanbul ignore next */  () => User,{foreignKey:"parentRecordAuthorId",constraints:true,onDelete:"SET NULL"})
    parentRecordAuthor: User;

    //Parent record foreign key
    @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174002", description: "ID of tweet parent record" })
    @ForeignKey(/* istanbul ignore next */  () => Tweet)
    @Column({ type: DataType.UUID, allowNull: true })
    parentRecordId: string;

    @BelongsTo(/* istanbul ignore next */  () => Tweet,{foreignKey:"parentRecordId",constraints:true,onDelete:"CASCADE",as:"isRetweeted"})
    isRetweeted: Tweet;
  

    @BelongsTo(/* istanbul ignore next */  () => Tweet,{foreignKey:"parentRecordId",constraints:true,onDelete:"CASCADE",as:"parentRecord"})
    parentRecord: Tweet;

    //Tweet's media
    @HasMany(/* istanbul ignore next */  () => Media,"tweetRecordId")
    tweetMedia: Media[]

    //Users, which saved or liked a tweet
    @BelongsToMany(/* istanbul ignore next */  () => User, /* istanbul ignore next */  () => SavedTweet,"tweetId")
    usersSaves: User[];

    @BelongsToMany(/* istanbul ignore next */  () => User, /* istanbul ignore next */  () => LikedTweet,"tweetId")
    usersLikes: User[];

    @HasMany(/* istanbul ignore next */  () => Message,"messageTweetId")
    messages: Message[];

    @HasOne(/* istanbul ignore next */  () => SavedTweet,{as:'isSaved'})
    userSavedTweet: SavedTweet

    @HasOne(/* istanbul ignore next */  () => LikedTweet,{as:'isLiked'})
    userLikedTweet: LikedTweet

    @HasOne(/* istanbul ignore next */  () => TweetCounts,{as:'counts',foreignKey:'tweetId'})
    counts: TweetCounts

}

