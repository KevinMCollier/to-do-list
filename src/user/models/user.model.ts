import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  productivityLevel: {
    type: String,
    required: true,
    enum: ['Lazy', 'Normal', 'Motivated']
  },
});

export interface User extends mongoose.Document {
  // id: string;
  name: string;
  email: string;
  createdAt: Date;
  productivityLevel: 'Lazy' | 'Normal' | 'Motivated';
}

export const UserModel = mongoose.model<User>('User', UserSchema);
