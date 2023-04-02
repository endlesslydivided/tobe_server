import { ApiProperty } from "@nestjs/swagger";
import {IsBoolean, IsOptional, IsString, Length } from "class-validator";

export class CreateMessageMoodDto {

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", description: "User's Id" })
  @IsString({ message: "Must be a string" })
  userId: string;

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", description: "Message's Id" })
  @IsString({ message: "Must be a string" })
  messageId: string;


  @ApiProperty({ example: "true", description: "Is message estimated by a neural net?" })  
  @IsOptional()
  @IsBoolean({ message: "Must be a bool value" })
  isNeuralEstimated: boolean;
  
  @ApiProperty({ example: "true", description: "Is message happy?" })
  @IsOptional()
  @IsBoolean({ message: "Must be a bool value" })
  isHappy: boolean;

  @ApiProperty({ example: "true", description: "Is message a joke?" })
  @IsOptional()
  @IsBoolean({ message: "Must be a bool value" })
  isJoke: boolean;

  @ApiProperty({ example: "true", description: "Is message offensive?" })
  @IsOptional()
  @IsBoolean({ message: "Must be a bool value" })
  isOffensive: boolean;

  @ApiProperty({ example: "true", description: "Is message happy?" })
  @IsOptional()
  @IsBoolean({ message: "Must be a bool value" })
  isAngry: boolean;

  @ApiProperty({ example: "true", description: "Is message bore?" })
  @IsOptional()
  @IsBoolean({ message: "Must be a bool value" })
  isBored: boolean;

  @ApiProperty({ example: "true", description: "Is message sad?" })
  @IsOptional()
  @IsBoolean({ message: "Must be a bool value" })
  isSad: boolean;

  @ApiProperty({ example: "true", description: "Is message neutral?" })
  @IsOptional()
  @IsBoolean({ message: "Must be a bool value" })
  isNeutral: boolean;


}