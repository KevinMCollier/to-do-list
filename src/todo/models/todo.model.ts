import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  date: { type: Date, required: true },
  repeat: { type: String, required: true, enum: ['Never', 'Daily', 'Weekly'] },
  dayOfWeek: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
  excludeWeekends: { type: Boolean, default: false },
});

export interface Todo extends mongoose.Document {
  title: string;
  description?: string;
  date: Date;
  repeat: 'Never' | 'Daily' | 'Weekly';
  dayOfWeek?: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  excludeWeekends?: boolean;
}
