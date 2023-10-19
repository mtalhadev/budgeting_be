import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsDate,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class GetExpenseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  userId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty()
  expense: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  recurring: boolean;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  recurringType: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  month: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(300)
  details: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}
