import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';
// import { Document, SchemaTypes, Types, ObjectId } from 'mongoose';

@Schema({
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
    // deletedAt: 'deleted',
  },
})
export class ExpenseCategory extends Document {
  @Prop({
    required: true,
  })
  _id: string;

  @Prop({
    required: true,
    minlength: 3,
    maxlength: 100,
  })
  expenseCategory: string;

  @Prop({
    required: true,
    minlength: 3,
    maxlength: 20,
  })
  color: string;
}

export const ExpenseCategorySchema =
  SchemaFactory.createForClass(ExpenseCategory);

export type ExpenseCategoryDocument = ExpenseCategory & Document;
