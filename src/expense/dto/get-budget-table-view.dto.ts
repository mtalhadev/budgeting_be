import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

class MonthlyTotal {
  @ApiProperty()
  @IsString()
  month: string;

  @ApiProperty()
  @IsNumber()
  total: number;
}

export class GetBudgetTableViewDto {
  @ApiProperty({ type: [MonthlyTotal] })
  totals: MonthlyTotal[];

  // Calculate the annual_total by summing the total property from all the MonthlyTotal objects.
  get annual_total(): number {
    return this.totals.reduce((sum, item) => sum + item.total, 0);
  }

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  expense: string;
}
