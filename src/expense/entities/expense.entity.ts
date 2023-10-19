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
export class Expense extends Document {
  @Prop({
    required: true,
  })
  _id: string;

  @Prop({
    required: true,
  })
  userId: string;

  @Prop({
    required: true,
    minlength: 3,
    maxlength: 100,
  })
  expense: string;

  @Prop({
    required: true,
    minlength: 1,
  })
  amount: number;

  @Prop({
    required: true,
    default: false,
  })
  recurring: boolean;

  @Prop({
    required: false,
  })
  recurringType: string;

  @Prop({
    required: true,
  })
  month: string;

  @Prop({
    maxlength: 300,
  })
  details: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);

export type ExpenseDocument = Expense & Document;
