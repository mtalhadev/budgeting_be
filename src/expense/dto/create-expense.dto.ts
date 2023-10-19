import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateExpenseDto {
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
  @MaxLength(20)
  recurringType: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  month: string;

  @ApiProperty()
  @IsString()
  @MaxLength(300)
  details: string;
}
