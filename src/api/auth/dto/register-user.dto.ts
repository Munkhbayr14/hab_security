import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  IsOptional,
  IsBoolean,
  IsObject,
  IsEnum,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsEmail()
  @MaxLength(32)
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  fisrtname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  confirmationPassword: string;

  @IsEnum(UserRole)
  role?: UserRole;
}
