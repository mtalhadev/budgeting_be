import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateExpenseCategoryDto {
  _id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty()
  expenseCategory: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  color: string;
}
