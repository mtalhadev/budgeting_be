import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
// import { validate, ValidatorOptions } from 'class-validator';

import {
  ExpenseCategory,
  ExpenseCategoryDocument,
} from './entities/expense-category.entity';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';

@Injectable()
export class ExpenseCategoryService {
  private logger = new Logger('ExpenseCategoryService');

  constructor(
    @InjectModel(ExpenseCategory.name)
    private expenseCategoryModel: Model<ExpenseCategoryDocument>,
  ) {}

  // async isValid(dto: any) {
  //   const options: ValidatorOptions = {
  //     skipMissingProperties: true,
  //   };

  //   const errors = await validate(dto, options);

  //   if (errors.length > 0) {
  //     return false;
  //   }

  //   return true;
  // }

  async create(createExpenseCategoryDto: CreateExpenseCategoryDto) {
    this.logger.log('Creating new Expense Category');

    const createdExpenseCategory = new this.expenseCategoryModel(
      createExpenseCategoryDto,
    );
    return createdExpenseCategory.save();
  }

  async findAll(): Promise<ExpenseCategory[]> {
    this.logger.log('Retrieving all Expense Categories');

    const categories = await this.expenseCategoryModel.find().exec();

    this.logger.log(`Found ${categories.length} Expense Categories`);

    return categories;
  }

  async findOne(_id: string): Promise<ExpenseCategory> {
    this.logger.log('Retrieving Expense Category by Id');

    if (!mongoose.Types.ObjectId.isValid(_id)) return;

    return await this.expenseCategoryModel.findById(_id).exec();
  }

  async find(filter: object): Promise<ExpenseCategory[]> {
    this.logger.log(`Retrieving Expense Category by given column: ${filter}`);
    this.logger.debug('filter ', filter);
    return await this.expenseCategoryModel.find(filter).exec();
  }

  async update(id: string, updateExpenseCategoryDto: UpdateExpenseCategoryDto) {
    this.logger.log('Updating Expense Category');
    return await this.expenseCategoryModel.findByIdAndUpdate(
      id,
      updateExpenseCategoryDto,
      { new: true },
    );
  }

  async remove(id: string) {
    this.logger.log('Removing Expense Category');
    return await this.expenseCategoryModel.findByIdAndRemove(id);
  }
}
