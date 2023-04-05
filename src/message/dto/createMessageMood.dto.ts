import { ApiProperty } from "@nestjs/swagger";
import {IsBoolean, IsOptional, IsString, Length } from "class-validator";

export class CreateMessageMoodDto {

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", description: "User's Id" })
  @IsOptional()
  @IsString({ message: "Must be a string" })
  userId: string|null;

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", description: "Message's Id" })
  @IsString({ message: "Must be a string" })
  messageId: string;


  @ApiProperty({ example: "true", description: "Is message estimated by a neural net?" })  
  @IsOptional()
  @IsBoolean({ message: "Must be a bool value" })
  isNeuralEstimated: boolean;
  
  @ApiProperty({ example: "1", description: "The value of happiness,expressed by an entry" })
  @IsOptional()
  isHappy: number;

  @ApiProperty({ example: "1", description: "The value of joke,expressed by an entry" })
  @IsOptional()
  isJoke: number;

  @ApiProperty({ example: "1", description: "The value of anger,expressed by an entry" })
  @IsOptional()
  isAngry: number;

  @ApiProperty({ example: "1", description: "The value of boredom,expressed by an entry" })
  @IsOptional()
  isBored: number;

  @ApiProperty({ example: "1", description: "The value of sadness,expressed by an entry" })
  @IsOptional()
  isSad: number;

  @ApiProperty({ example: "1", description: "The value of neutrality,expressed by an entry" })
  @IsOptional()
  isNeutral: number;


}