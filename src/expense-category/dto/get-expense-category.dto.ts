import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsDate,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class GetExpenseCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  expenseCategory: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  color: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}
