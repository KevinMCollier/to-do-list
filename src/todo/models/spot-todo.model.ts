import * as mongoose from 'mongoose';

export const SpotTodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  date: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

export interface SpotTodo extends mongoose.Document {
  id: string;
  title: string;
  description?: string;
  date: Date;
  userId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}
