import { ApiProperty } from "@nestjs/swagger";
import {IsBoolean, IsNumber, IsOptional, IsString, Length, Max, Min } from "class-validator";

export class CreateBotMessageDto {

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", description: "User's Id" })
  @IsString({ message: "Must be a string" })
  userId: string;

  @ApiProperty({ example: "Feel kinda depressed today...", description: "Bot message text" })
  @IsString({ message: "Must be a string" })
  text: string;


  @ApiProperty({ example: "true", description: "Is an entry used to store discussion session data" })
  @IsBoolean({message:'Must be a boolean value'})
  isTalkingSession: boolean;

  @ApiProperty({ example: "true", description: "Is message generated by a neural net?" })
  @IsBoolean({message:'Must be a boolean value'})
  isNeuralGenerated: boolean;

 
}