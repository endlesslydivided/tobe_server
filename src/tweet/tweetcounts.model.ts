import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "../user/user.model";
import { Tweet } from "./tweet.model";

@Table({ tableName: "tweetCounts", createdAt:false,updatedAt:false,deletedAt:false,})
export class TweetCounts extends Model<TweetCounts> {

  
  @ForeignKey(/* istanbul ignore next */  () => Tweet)
  @PrimaryKey
  @Column({ type: DataType.UUIDV4 })
  tweetId: string;

  @Column({ type: DataType.BIGINT})
  likesCount: number;

  @Column({ type: DataType.BIGINT})
  savesCount: number;

  @Column({ type: DataType.BIGINT})
  retweetsCount: number;

  @Column({ type: DataType.BIGINT})
  commentsCount: number;

  @BelongsTo(/* istanbul ignore next */  () => Tweet,"tweetId")
  relatedTweet: Tweet

}