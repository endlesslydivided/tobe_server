import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../user/user.model";
import { Message } from "./message.model";

@Table({ tableName: "favoriteMessage"})
export class FavoriteMessage extends Model<FavoriteMessage> {

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", description: "User which marked a message" })
  @ForeignKey(/* istanbul ignore next */() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174001", description: "Favorite message id" })
  @ForeignKey(/* istanbul ignore next */() => Message)
  @Column({ type: DataType.UUID })
  messageId: string;

  @BelongsTo(/* istanbul ignore next */() => User,"userId")
  user: User

  @BelongsTo(/* istanbul ignore next */() => Message,"messageId")
  message: Message

}