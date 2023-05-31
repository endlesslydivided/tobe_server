import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./user.model";

@Table({ tableName: "mentalCounts", createdAt:false,updatedAt:false,deletedAt:false})
export class MentalCounts extends Model<MentalCounts> {

  
  @ForeignKey(/* istanbul ignore next */() => User)
  @PrimaryKey
  @Column({ type: DataType.UUIDV4 })
  userMoodId: string;

  @Column({ type: DataType.DECIMAL(3, 2).UNSIGNED.ZEROFILL})
  happyAvgMessage: number;
  @Column({ type: DataType.DECIMAL(3, 2).UNSIGNED.ZEROFILL})
  angryAvgMessage: number;
  @Column({ type: DataType.DECIMAL(3, 2).UNSIGNED.ZEROFILL})
  boredAvgMessage: number;
  @Column({ type: DataType.DECIMAL(3, 2).UNSIGNED.ZEROFILL})
  neutralAvgMessage: number;
  @Column({ type: DataType.DECIMAL(3, 2).UNSIGNED.ZEROFILL})
  sadAvgMessage: number;

  @Column({ type: DataType.DECIMAL(3, 2).UNSIGNED.ZEROFILL})
  happyAvgDiary: number;
  @Column({ type: DataType.DECIMAL(3, 2).UNSIGNED.ZEROFILL})
  angryAvgDiary: number;
  @Column({ type: DataType.DECIMAL(3, 2).UNSIGNED.ZEROFILL})
  boredAvgDiary: number;
  @Column({ type: DataType.DECIMAL(3, 2).UNSIGNED.ZEROFILL})
  neutralAvgDiary: number;
  @Column({ type: DataType.DECIMAL(3, 2).UNSIGNED.ZEROFILL})
  sadAvgDiary: number;

  @Column({ type: DataType.DECIMAL(3, 2).UNSIGNED.ZEROFILL})
  happyAvgTotal: number;
  @Column({ type: DataType.DECIMAL(3, 2).UNSIGNED.ZEROFILL})
  angryAvgTotal: number;
  @Column({ type: DataType.DECIMAL(3, 2).UNSIGNED.ZEROFILL})
  boredAvgTotal: number;
  @Column({ type: DataType.DECIMAL(3, 2).UNSIGNED.ZEROFILL})
  neutralAvgTotal: number;
  @Column({ type: DataType.DECIMAL(3, 2).UNSIGNED.ZEROFILL})
  sadAvgTotal: number;

  @BelongsTo(/* istanbul ignore next */() => User,"userMoodId")
  relatedUser: User

}