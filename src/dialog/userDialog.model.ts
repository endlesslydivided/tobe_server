import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../user/user.model";
import { Dialog } from "./dialog.model";

@Table({ tableName: "userDialog", timestamps: true, createdAt: "createdAt", updatedAt: false })
export class UserDialog extends Model<UserDialog> {

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", description: "Unique user dialog identifier" })
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID, allowNull:false, primaryKey: true })
  id: string;

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174001", description: "User identifier" })
  @ForeignKey(/* istanbul ignore next */ () => User)
  @Column({ type: DataType.STRING })
  userId: string;

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", description: "Dialog identifier" })
  @ForeignKey(/* istanbul ignore next */ () => Dialog)
  @Column({ type: DataType.STRING })
  dialogId: string;

  @BelongsTo(/* istanbul ignore next */ () => User)
  user: User

  @BelongsTo(/* istanbul ignore next */ () => Dialog)
  dialog: Dialog
}