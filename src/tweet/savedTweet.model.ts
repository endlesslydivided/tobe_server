import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../user/user.model";
import { Tweet } from "./tweet.model";

@Table({ tableName: "savedTweet"})
export class SavedTweet extends Model<SavedTweet> {

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", description: "User which saved a tweet" })
  @ForeignKey(/* istanbul ignore next */  () => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174001", description: "Saved tweet id" })
  @ForeignKey(/* istanbul ignore next */  () => Tweet)
  @Column({ type: DataType.UUID })
  tweetId: string;

  @BelongsTo(/* istanbul ignore next */  () => User,"userId")
  user: User

  @BelongsTo(/* istanbul ignore next */  () => Tweet,"tweetId")
  tweet: Tweet

}