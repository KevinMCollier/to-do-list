import * as mongoose from 'mongoose';
import { User } from '../../user/modules/user.module'

export const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  date: { type: Date, required: true },
  repeat: { type: String, required: true, enum: ['Never', 'Daily - Weekdays', 'Daily - Weekends', 'Daily', 'Weekly'] },
  dayOfWeek: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: false },
  excludeWeekends: { type: Boolean, default: false, required: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

export interface Todo extends mongoose.Document {
  title: string;
  description?: string;
  date: Date;
  repeat: 'Never' | 'Daily - Weekdays' | 'Daily - Weekends' | 'Daily' | 'Weekly';
  dayOfWeek?: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  excludeWeekends?: boolean;
  user: mongoose.Schema.Types.ObjectId | User;
}
