import * as mongoose from 'mongoose';

export const WeeklyTodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  dayOfWeek: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

export interface WeeklyTodo extends mongoose.Document {
  id: string;
  title: string;
  description?: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  userId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}
