import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./user.model";

@Table({ tableName: "userCounts", createdAt:false,updatedAt:false,deletedAt:false,})
export class UserCounts extends Model<UserCounts> {

  
  @ForeignKey(/* istanbul ignore next */() => User)
  @PrimaryKey
  @Column({ type: DataType.UUIDV4 })
  userId: string;

  @Column({ type: DataType.BIGINT})
  subscriptionsCount: number;

  @Column({ type: DataType.BIGINT})
  followersCount: number;

  @Column({ type: DataType.BIGINT})
  tweetsCount: number;

  @BelongsTo(/* istanbul ignore next */() => User,"userId")
  relatedUser: User

}