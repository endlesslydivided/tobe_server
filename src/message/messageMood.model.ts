import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";
import { Message } from "./message.model";


interface MessageMoodCreationAttribute {
  userId: string;
  messageId: string;
  isNeuralEstimated: boolean;
  isHappy: boolean;
  isJoke: boolean;
  isOffensive: boolean;
  isAngry: boolean;
  isBored: boolean;
  isSad: boolean;
  isNeutral: boolean;
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

  @ApiProperty({ example: "true", description: "Is message happy?" })
  @Column({ type: DataType.BOOLEAN, allowNull: true })
  isHappy: boolean;

  @ApiProperty({ example: "true", description: "Is message a joke?" })
  @Column({ type: DataType.BOOLEAN, allowNull: true })
  isJoke: boolean;

  @ApiProperty({ example: "true", description: "Is message offensive?" })
  @Column({ type: DataType.BOOLEAN, allowNull: true })
  isOffensive: boolean;

  @ApiProperty({ example: "true", description: "Is message happy?" })
  @Column({ type: DataType.BOOLEAN, allowNull: true })
  isAngry: boolean;

  @ApiProperty({ example: "true", description: "Is message bore?" })
  @Column({ type: DataType.BOOLEAN, allowNull: true })
  isBored: boolean;

  @ApiProperty({ example: "true", description: "Is message sad?" })
  @Column({ type: DataType.BOOLEAN, allowNull: true })
  isSad: boolean;

  @ApiProperty({ example: "true", description: "Is message neutral?" })
  @Column({ type: DataType.BOOLEAN, allowNull: true })
  isNeutral: boolean;

  @BelongsTo(() => User,"userId")
  user: User

  @BelongsTo(() => Message,"messageId")
  message: Message

}