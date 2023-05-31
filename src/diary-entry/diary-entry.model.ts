import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../user/user.model";


interface DiaryEntryCreationAttribute {
  userId: string;
  text: string;
  happy: number;
  angry: number;
  bored: number;
  sad: number;
  neutral: number;
}


@Table({ tableName: "diaryEntry", createdAt:true,updatedAt:true,paranoid:true})
export class DiaryEntry extends Model<DiaryEntry,DiaryEntryCreationAttribute> {

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174001", description: "Unique diary entry identifier" })
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID, allowNull:false, primaryKey: true })
  id: string;

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", description: "User which created an entry" })
  @ForeignKey(/* istanbul ignore next */  () => User)
  @Column({ type: DataType.UUID, allowNull: true  })
  userId: string;

  @ApiProperty({ example: "Feel kinda depressed today...", description: "Diary note text" })
  @Column({ type: DataType.TEXT, allowNull: true })
  text: string;

  @ApiProperty({ example: "10", description: "The value of happiness,expressed by an entry" })
  @Default(0)
  @Column({ type: DataType.BIGINT, allowNull: true })
  happy: number;

  @ApiProperty({ example: "10", description: "The value of agression,expressed by an entry" })
  @Default(0)
  @Column({ type: DataType.BIGINT, allowNull: true })
  angry: number;

  @ApiProperty({ example: "10", description: "The value of boredom,expressed by an entry" })
  @Default(0)
  @Column({ type: DataType.BIGINT, allowNull: true })
  bored: number;

  @ApiProperty({ example: "10", description: "The value of sadness,expressed by an entry" })
  @Default(0)
  @Column({ type: DataType.BIGINT, allowNull: true })
  sad: number;

  @ApiProperty({ example: "10", description: "The value of neutraliness,expressed by an entry" })
  @Default(0)
  @Column({ type: DataType.BIGINT, allowNull: true })
  neutral: number;

  @ApiProperty({ example: "09.04.2002", description: "Entry date" })
  @Column({ type: DataType.DATE, allowNull: true })
  entryDate: number;

  @BelongsTo(/* istanbul ignore next */  () => User,"userId")
  user: User

}