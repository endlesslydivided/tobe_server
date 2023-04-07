import { ApiProperty } from "@nestjs/swagger";
import {IsBoolean, IsDateString, IsNumber, IsOptional, IsString, Length, Max, Min } from "class-validator";

export class CreateDiaryEntryDto {

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", description: "User's Id" })
  @IsString({ message: "Must be a string" })
  userId: string;

  @ApiProperty({ example: "Feel kinda depressed today...", description: "Diary note text" })
  @IsString({ message: "Must be a string" })
  text: string;

  @ApiProperty({ example: "true", description: "The value of happiness,expressed by an entry" })
  @IsNumber({},{ message:"Must be a number value"})
  @Max(10)
  @Min(0)
  happy: number = 0;

  @ApiProperty({ example: "true", description: "The value of agression,expressed by an entry" })
  @IsNumber({},{ message:"Must be a number value"})
  @Max(10)
  @Min(0)
  angry: number = 0;

  @ApiProperty({ example: "true", description: "The value of boredom,expressed by an entry" })
  @IsNumber({},{ message:"Must be a number value"})
  @Max(10)
  @Min(0)
  bored: number = 0;

  @ApiProperty({ example: "true", description: "The value of sadness,expressed by an entry" })
  @IsNumber({},{ message:"Must be a number value"})
  @Max(10)
  @Min(0)
  sad: number = 0;

  @ApiProperty({ example: "true", description: "The value of neutraliness,expressed by an entry" })
  @IsNumber({},{ message:"Must be a number value"})
  @Max(10)
  @Min(0)
  neutral: number = 0;

  @ApiProperty({ example: "09/04/2002", description: "Entry creation date" })
  entryDate
}