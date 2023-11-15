import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  date: { type: Date, required: true },
  repeat: { type: String, required: true, enum: ['Never', 'Daily - Weekdays', 'Daily - Weekends', 'Daily', 'Weekly'] },
  dayOfWeek: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: false },
  excludeWeekends: { type: Boolean, default: false, required: false },
});

export interface Todo extends mongoose.Document {
  title: string;
  description?: string;
  date: Date;
  repeat: 'Never' | 'Daily - Weekdays' | 'Daily - Weekends' | 'Daily' | 'Weekly';
  dayOfWeek?: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  excludeWeekends?: boolean;
}
