import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../user/user.model";
import { Message } from "./message.model";


interface MessageMoodCreationAttribute {
  userId: string;
  messageId: string;
  isNeuralEstimated: boolean;
  isHappy: number;
  isJoke: number;
  isAngry: number;
  isBored: number;
  isSad: number;
  isNeutral: number;
}


@Table({ tableName: "messageMood"})
export class MessageMood extends Model<MessageMood,MessageMoodCreationAttribute> {

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174001", description: "Unique message mood identifier" })
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID, allowNull:false, primaryKey: true })
  id: string;

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", description: "User which marked a message" })
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: true  })
  userId: string;

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174001", description: "Marked message id" })
  @ForeignKey(() => Message)
  @Column({ type: DataType.UUID })
  messageId: string;

  @ApiProperty({ example: "true", description: "Is message estimated by a neural net?" })
  @Column({ type: DataType.BOOLEAN, allowNull: true })
  isNeuralEstimated: boolean;

  @ApiProperty({ example: "1", description: "The value of happiness,expressed by an entry" })
  @Default(0)
  @Column({ type: DataType.DECIMAL(3,2), allowNull: true })
  isHappy: number;

  @ApiProperty({ example: "1", description: "The value of joke,expressed by an entry" })
  @Default(0)
  @Column({ type: DataType.DECIMAL(3,2), allowNull: true })
  isJoke: number;

  @ApiProperty({ example: "1", description: "The value of anger,expressed by an entry" })
  @Default(0)
  @Column({ type: DataType.DECIMAL(3,2), allowNull: true })
  isAngry: number;

  @ApiProperty({ example: "1", description: "The value of boredom,expressed by an entry" })
  @Default(0)
  @Column({ type: DataType.DECIMAL(3,2), allowNull: true })
  isBored: number;

  @ApiProperty({ example: "1", description: "The value of sadness,expressed by an entry" })
  @Default(0)
  @Column({ type: DataType.DECIMAL(3,2), allowNull: true })
  isSad: number;

  @ApiProperty({ example: "1", description: "The value of neutrality,expressed by an entry" })
  @Default(0)
  @Column({ type: DataType.DECIMAL(3,2), allowNull: true })
  isNeutral: number;

  @BelongsTo(() => User,"userId")
  user: User

  @BelongsTo(() => Message,"messageId")
  message: Message

}