import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsOptional, IsString, Length } from "class-validator";

export class CreateUserDTO {
  @ApiProperty({ example: "Alexander", description: "User's firstname" })
  @IsString({ message: "Must be a string" })
  @Length(1, 50, { message: "Firstname length: to 50 symbols" })
  firstname: string;

  @ApiProperty({ example: "Kovalyov", description: "User's lastname" })
  @IsString({ message: "Must be a string" })
  @Length(1, 50, { message: "Surname length: to 50 symbols" })
  surname: string;

  @ApiProperty({ example: "Man", description: "Sex" })
  @IsString({ message: "Must be a string" })
  @Length(1, 10, { message: "To 10 symbols" })
  sex: string;

  @ApiProperty({ example: "Belarus", description: "User's country of living" })
  @IsString({ message: "Must be a string" })
  @Length(1, 50, { message: "To 50 symbols" })
  country: string;

  @ApiProperty({ example: "Minsk", description: "User's city of living" })
  @IsString({ message: "Must be a string" })
  @Length(1, 100, { message: "To 100 symbols" })
  city: string;

  @ApiProperty({ example: "user@do.men", description: "User's email" })
  @IsString({ message: "Must be a string" })
  @IsEmail({}, { message: "Incorrect email" })
  email: string;

  @ApiProperty({ example: "true", description: "Is user email confirmed?" })
  @IsBoolean()
  @IsOptional()
  emailConfirmed: boolean;

  @ApiProperty({ example: "12345", description: "User's password" })
  @IsString({ message: "Must be a string" })
  @Length(8, 30, { message: "Password length: from 8 to 30 symbols" })
  password: string;

  @ApiProperty({ example: "12345", description: "User's password hash salt" })
  salt: string;
}


