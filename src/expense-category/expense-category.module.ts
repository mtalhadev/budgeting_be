import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ExpenseCategoryService } from './expense-category.service';
import { ExpenseCategoryController } from './expense-category.controller';

import {
  ExpenseCategory,
  ExpenseCategorySchema,
} from './entities/expense-category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExpenseCategory.name, schema: ExpenseCategorySchema },
    ]),
  ],
  controllers: [ExpenseCategoryController],
  providers: [ExpenseCategoryService, Logger],
})
export class ExpenseCategoryModule {}
