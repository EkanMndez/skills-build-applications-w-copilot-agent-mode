import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    goal: { type: String, required: true },
    weeklyMinutes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const User = model('User', userSchema, 'users');
