import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseCategoryDto } from './create-expense-category.dto';
import {
  // IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateExpenseCategoryDto extends PartialType(
  CreateExpenseCategoryDto,
) {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @MinLength(3)
  @MaxLength(100)
  expenseCategory: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  color: string;

  // @ApiProperty()
  // @IsDate()
  // updatedAt: Date;
}
