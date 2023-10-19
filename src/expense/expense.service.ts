import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
// import { validate, ValidatorOptions } from 'class-validator';

import { Expense, ExpenseDocument } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpenseService {
  private logger = new Logger('ExpenseService');

  constructor(
    @InjectModel(Expense.name)
    private expenseModel: Model<ExpenseDocument>,
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

  // async create(expense: Expense): Promise<Expense> {
  //   return new this.expenseModel(expense).save();
  // }

  async create(createExpenseDto: CreateExpenseDto) {
    this.logger.log('Creating new Expense ');

    const createdExpense = new this.expenseModel(createExpenseDto);
    return createdExpense.save();
  }

  // findAll() {
  //   return `This action returns all expense`;
  // }

  async findAll(): Promise<Expense[]> {
    this.logger.log('Retrieving all Expenses');

    const expenses = await this.expenseModel.find().exec();

    this.logger.log(`Found ${expenses.length} Expenses`);

    return expenses;
  }

  async findOne(_id: string): Promise<Expense> {
    this.logger.log('Retrieving Expense  by Id');

    if (!mongoose.Types.ObjectId.isValid(_id)) return;

    return await this.expenseModel.findById(_id).exec();
  }

  async find(filter: object): Promise<Expense[]> {
    this.logger.log(`Retrieving Expense  by given column: ${filter}`);
    this.logger.debug('filter ', filter);
    return await this.expenseModel.find(filter).exec();
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    this.logger.log('Updating Expense ');
    return await this.expenseModel.findByIdAndUpdate(id, updateExpenseDto, {
      new: true,
    });
  }

  async remove(id: string) {
    this.logger.log('Removing Expense ');
    return await this.expenseModel.findByIdAndRemove(id);
  }

  // async getBudgetTableView(user_id: string): Promise<Expense[]> {
  async getBudgetTableView(user_id: string) {
    this.logger.log('Retrieving Budget Table View');

    // try {
    //   const result = await this.expenseModel
    //     .aggregate([
    //       {
    //         $match: {
    //           userId: user_id, // Filter by userId
    //         },
    //       },
    //       {
    //         $group: {
    //           _id: {
    //             month: '$month',
    //             expense: '$expense',
    //           },
    //           totalAmount: { $sum: '$amount' },
    //         },
    //       },
    //       {
    //         $group: {
    //           _id: {
    //             month: '$_id.month',
    //           },
    //           expenses: {
    //             $push: {
    //               expense: '$_id.expense',
    //               totalAmount: '$totalAmount',
    //             },
    //           },
    //           totalAmount: { $sum: '$totalAmount' },
    //         },
    //       },
    //       {
    //         $project: {
    //           _id: 0,
    //           month: '$_id.month',
    //           totalAmount: 1,
    //           expenses: 1,
    //         },
    //       },
    //     ])
    //     .exec();
    //   this.logger.log(result);
    //   return result; // Return the result as an array of Expense totals objects
    // } catch (error) {
    //   throw new Error('Failed to fetch budget table view');
    // }

    this.logger.log('Retrieving Budget Table View');

    const result = await this.expenseModel.aggregate([
      {
        $match: {
          userId: user_id, // Filter by userId
        },
      },
      {
        $group: {
          _id: {
            userId: '$userId',
            expense: '$expense',
            month: '$month',
          },
          total: { $sum: '$amount' },
        },
      },
      {
        $group: {
          _id: {
            userId: '$_id.userId',
            expense: '$_id.expense',
          },
          totals: {
            $push: {
              month: '$_id.month',
              total: '$total',
            },
          },
          total: { $sum: '$total' },
        },
      },
      {
        $project: {
          _id: 0,
          // userId: '$_id.userId',
          expense: '$_id.expense',
          total: 1,
          totals: 1,
          // january_total: {
          //   $sum: {
          //     $cond: [
          //       { $eq: ['$totals.month', 'January'] },
          //       '$totals.total',
          //       0,
          //     ],
          //   },
          // },
          // february_total: {
          //   $sum: {
          //     $cond: [
          //       { $eq: ['$totals.month', 'February'] },
          //       '$totals.total',
          //       0,
          //     ],
          //   },
          // },
          // Repeat for other months (March, April, etc.)
        },
      },
    ]);

    // this.logger.log(result);

    return result;
  }
}
