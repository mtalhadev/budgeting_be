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
// import { JwtAuthGuard } from '@nestjs/passport';

import { ExpenseCategoryService } from './expense-category.service';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
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
import { GetExpenseCategoryDto } from './dto/get-expense-category.dto';
import { Types } from 'mongoose';
// import { IsUUID, Validate } from 'class-validator';

@Controller('expense-category')
export class ExpenseCategoryController {
  constructor(
    private readonly expenseCategoryService: ExpenseCategoryService,
    private logger: Logger,
  ) {}

  @Post()
  @ApiTags('expense-category')
  @ApiOperation({ summary: 'Create Expense Category' })
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Expense Category created successfully.',
    type: CreateExpenseCategoryDto,
  })
  @HttpCode(HttpStatus.BAD_REQUEST)
  @ApiBadRequestResponse({
    description: 'Invalid Expense Category Data!',
  })
  @ApiBody({ type: CreateExpenseCategoryDto })
  async create(
    @Body() createExpenseCategoryDto: CreateExpenseCategoryDto,
    @Req() request: Request,
    // @Res() response,
  ) {
    this.logger.debug(request);
    this.logger.log(`Handling a new Expense Category Creating request`);

    // Validate DTO
    // if (!this.expenseCategoryService.isValid(createExpenseCategoryDto)) {
    //   throw new BadRequestException('Invalid Expense Category Data!');
    // }

    this.logger.debug('createExpenseCategoryDto: ', createExpenseCategoryDto);
    // Find existing category with same name
    const existing = await this.expenseCategoryService.find({
      expenseCategory: createExpenseCategoryDto.expenseCategory,
    });
    this.logger.debug('existing ', existing);
    // Handle 409 if  found
    if (existing && existing.length > 0) {
      throw new ConflictException('Expense Category Already Available!');
    }

    createExpenseCategoryDto._id = new Types.ObjectId().toHexString();

    // Create category
    const expenseCategory = await this.expenseCategoryService.create(
      createExpenseCategoryDto,
    );

    this.logger.log(`Expense Category created with id ${expenseCategory.id}`);

    // Another way of returnning
    // return response.status(HttpStatus.CREATED).json({
    //   expenseCategory,
    // });

    // Return 201 Created
    return {
      message: 'Expense Category created successfully',
      expenseCategory,
    };
  }

  @Get()
  @ApiTags('expense-category')
  @ApiOperation({ summary: 'Get All Expense Categories' })
  @HttpCode(HttpStatus.OK)
  // @ApiOkResponse({ description: 'The records have been successfully queried.' })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'List all Expense Categories',
    type: GetExpenseCategoryDto,
    isArray: true,
  })
  async findAll(@Req() request: Request) {
    this.logger.debug(request.headers);
    this.logger.log('Handling findAll Expense Categories request');

    return await this.expenseCategoryService.findAll();
  }

  @Get(':id')
  @ApiTags('expense-category')
  @ApiOperation({ summary: 'Find expense category by ID' })
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
  @ApiResponse({ type: GetExpenseCategoryDto })
  async findOne(@Param('id') id: string) {
    this.logger.log(`Handling findOne Expense Category request`);

    const expenseCategory = await this.expenseCategoryService.findOne(id);
    if (!expenseCategory) {
      throw new NotFoundException('Expnse Category Not Found!');
    }
    return expenseCategory;
  }

  @Patch(':id')
  @ApiTags('expense-category')
  @ApiOperation({ summary: 'Update Expense Category' })
  // @HttpCode(HttpStatus.OK)
  // @HttpCode(HttpStatus.BAD_REQUEST)
  // @HttpCode(HttpStatus.NOT_FOUND)
  @ApiBody({ type: UpdateExpenseCategoryDto })
  @ApiResponse({
    status: 200,
    description: 'Expense Category updated successfully.',
    type: UpdateExpenseCategoryDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Expense Category not found.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateExpenseCategoryDto: UpdateExpenseCategoryDto,
  ) {
    this.logger.log(`Handling Expense Category Updating request`);

    // Find Expense category by id
    const existingExpenseCategory = await this.expenseCategoryService.findOne(
      id,
    );

    if (!existingExpenseCategory) {
      throw new NotFoundException('Expense Category Not Found!'); // 404
    }

    // validate DTO
    // if (this.expenseCategoryService.isValid(updateExpenseCategoryDto)) {
    //   throw new BadRequestException('Invalid Expense Category Data!'); // 400
    // }

    // Update Expense Category
    const expenseCategory = await this.expenseCategoryService.update(
      id,
      updateExpenseCategoryDto,
    );

    // return 200 updated
    return {
      message: 'Expense Category updated successfully',
      expenseCategory,
    };
  }

  @Delete(':id')
  @ApiTags('expense-category')
  // @HttpCode(HttpStatus.NOT_FOUND)
  @ApiResponse({
    status: 404,
    description: 'Expense Category not found.',
  })
  // @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Expense Category deleted successfully.',
    type: UpdateExpenseCategoryDto,
  })
  async remove(@Param('id') id: string) {
    // return this.expenseCategoryService.remove(id);

    this.logger.log(`Handling Expense Category Deleting request`);

    // Find category by id
    const category = await this.expenseCategoryService.findOne(id);

    // Handle 404 if not found
    if (!category) {
      throw new NotFoundException('Expense Category not found');
    }

    // Delete category
    const expenseCategory = await this.expenseCategoryService.remove(id);

    // Return 200
    return {
      message: 'Expense Category deleted successfully',
      expenseCategory,
    };
  }
}
