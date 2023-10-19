import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  // Res,
  HttpCode,
  HttpStatus,
  NotFoundException,
  // ParseUUIDPipe,
  // BadRequestException,
  Logger,
  ConflictException,

  // UseGuards,
  // AuthGuard
  // JwtAuthGuard,
} from '@nestjs/common';
import { Request } from 'express';
// import { JwtAuthGuard } from '@nestjs/passport';

import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import {
  ApiBadRequestResponse,
  // ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  // ApiResponse,
  // ApiModelProperty
} from '@nestjs/swagger';
import { GetExpenseDto } from './dto/get-expense.dto';
import { Types } from 'mongoose';
import { GetBudgetTableViewDto } from './dto/get-budget-table-view.dto';
// import { IsUUID, Validate } from 'class-validator';

@Controller('expense')
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
    private logger: Logger,
  ) {}

  @Post()
  @ApiTags('expense')
  @ApiOperation({ summary: 'Create Expense' })
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Expense created successfully.',
    type: CreateExpenseDto,
  })
  @HttpCode(HttpStatus.BAD_REQUEST)
  @ApiBadRequestResponse({
    description: 'Invalid Expense Data!',
  })
  @ApiBody({ type: CreateExpenseDto })
  async create(
    @Body() createExpenseDto: CreateExpenseDto,
    @Req() request: Request,
    // @Res() response,
  ) {
    this.logger.debug(request);
    this.logger.log(`Handling a new Expense Creating request`);

    // Validate DTO
    // if (!this.expenseService.isValid(createExpenseDto)) {
    //   throw new BadRequestException('Invalid Expense  Data!');
    // }

    this.logger.debug('createExpenseDto: ', createExpenseDto);
    // Find existing  with same name
    const existing = await this.expenseService.find({
      expense: createExpenseDto.expense,
    });
    this.logger.debug('existing ', existing);
    // Handle 409 if  found
    if (existing && existing.length > 0) {
      throw new ConflictException('Expense Already Available!');
    }

    createExpenseDto._id = new Types.ObjectId().toHexString();

    // Create
    const expense = await this.expenseService.create(createExpenseDto);

    this.logger.log(`Expense created with id ${expense.id}`);

    // Another way of returnning
    // return response.status(HttpStatus.CREATED).json({
    //   expense,
    // });

    // Return 201 Created
    return {
      message: 'Expense created successfully',
      expense,
    };
  }

  @Get()
  @ApiTags('expense')
  @ApiOperation({ summary: 'Get All Expenses' })
  @HttpCode(HttpStatus.OK)
  // @ApiResponse({
  //   status: 200,
  //   description: 'The records have been successfully queried.',
  // })
  // @ApiOkResponse({ description: 'The records have been successfully queried.' })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'List all Expenses',
    type: GetExpenseDto,
    isArray: true,
  })
  async findAll(@Req() request: Request) {
    this.logger.debug(request.headers);
    this.logger.log('Handling findAll Expenses request');

    return await this.expenseService.findAll();
  }

  @Get(':id')
  @ApiTags('expense')
  @ApiOperation({ summary: 'Find expense by ID' })
  @HttpCode(HttpStatus.OK)
  // @ApiResponse({
  //   status: 200,
  //   description: 'The record has been successfully found.',
  // })
  @ApiOkResponse({ description: 'The record has been successfully found.' })
  @HttpCode(HttpStatus.NOT_FOUND)
  // @ApiResponse({
  //   status: 404,
  //   description: 'The record could not be found.',
  // })
  @ApiNotFoundResponse({ description: 'The record could not be found.' })
  @ApiParam({ name: 'id', required: true })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: GetExpenseDto })
  async findOne(@Param('id') id: string) {
    this.logger.log(`Handling findOne Expense request`);

    const expense = await this.expenseService.findOne(id);
    if (!expense) {
      throw new NotFoundException('Expnse Not Found!');
    }
    return expense;
  }

  @Patch(':id')
  @ApiTags('expense')
  @ApiOperation({ summary: 'Update Expense' })
  // @HttpCode(HttpStatus.OK)
  // @HttpCode(HttpStatus.BAD_REQUEST)
  // @HttpCode(HttpStatus.NOT_FOUND)
  @ApiBody({ type: UpdateExpenseDto })
  @ApiResponse({
    status: 200,
    description: 'Expense updated successfully.',
    type: UpdateExpenseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Expense not found.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    this.logger.log(`Handling Expense Updating request`);

    // Find Expense  by id
    const existingExpense = await this.expenseService.findOne(id);

    if (!existingExpense) {
      throw new NotFoundException('Expense Not Found!'); // 404
    }

    // validate DTO
    // if (this.expenseService.isValid(updateExpenseDto)) {
    //   throw new BadRequestException('Invalid Expense  Data!'); // 400
    // }

    // Update Expense
    const expense = await this.expenseService.update(id, updateExpenseDto);

    // return 200 updated
    return {
      message: 'Expense updated successfully',
      expense,
    };

    // return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiTags('expense')
  // @HttpCode(HttpStatus.NOT_FOUND)
  @ApiResponse({
    status: 404,
    description: 'Expense not found.',
  })
  // @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Expense deleted successfully.',
    type: UpdateExpenseDto,
  })
  async remove(@Param('id') id: string) {
    // return this.expenseService.remove(id);

    this.logger.log(`Handling Expense Deleting request`);

    // Find  by id
    const expenseToDelete = await this.expenseService.findOne(id);

    // Handle 404 if not found
    if (!expenseToDelete) {
      throw new NotFoundException('Expense not found');
    }

    // Delete
    const expense = await this.expenseService.remove(id);

    // Return 200
    return {
      message: 'Expense deleted successfully',
      expense,
    };
  }

  @Get('table-view/:user_id')
  @ApiTags('Budget Views')
  @ApiOperation({ summary: 'Get Budget Table View' })
  @HttpCode(HttpStatus.OK)
  // @ApiResponse({
  //   status: 200,
  //   description: 'The records have been successfully queried.',
  // })
  // @ApiOkResponse({ description: 'The records have been successfully queried.' })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Get Budget Table View',
    type: GetBudgetTableViewDto,
    isArray: true,
  })
  async getBudgetTableView(@Param('user_id') user_id: string) {
    this.logger.debug(user_id);
    this.logger.log('Handling Get Budget Table View');

    return await this.expenseService.getBudgetTableView(user_id);
  }
}
