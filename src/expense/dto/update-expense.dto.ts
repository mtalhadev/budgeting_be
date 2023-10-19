import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDto } from './create-expense.dto';
import {
  IsBoolean,
  // IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
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
}
