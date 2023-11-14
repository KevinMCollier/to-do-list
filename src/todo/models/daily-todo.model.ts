import * as mongoose from 'mongoose';

export const DailyTodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  excludeWeekends: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export interface DailyTodo extends mongoose.Document {
  id: string;
  title: string;
  description?: string;
  excludeWeekends: boolean;
  userId: mongoose.Schema.Types.ObjectId;
}
