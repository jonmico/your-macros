import mongoose, { Schema } from 'mongoose';
import IUser from '../types/user';
import ILog from '../types/log';
import { foodSchema } from './food';
import IMeal from '../types/meal';

export const mealSchema = new mongoose.Schema<IMeal>(
  {
    mealComponents: [
      {
        food: {
          type: foodSchema,
          required: true,
        },
        servings: { type: Number, default: 1 },
      },
    ],
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    macros: {
      carbs: { type: Number, required: true },
      fat: { type: Number, required: true },
      protein: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const logSchema = new Schema<ILog>(
  {
    meals: [mealSchema],
    name: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    macros: {
      carbs: { type: Number },
      fat: { type: Number },
      protein: { type: Number },
    },
    calories: { type: Number },
  },
  { timestamps: true }
);

export const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  logs: [logSchema],
  currentLog: logSchema,
});

const User = mongoose.model('User', userSchema);

export default User;
