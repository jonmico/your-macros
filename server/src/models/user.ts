import mongoose, { Schema } from 'mongoose';
import IUser from '../types/user';
import ILog from '../types/log';
import { foodSchema } from './food';
import IMeal from '../types/meal';
import IYourFood from '../types/your-food';

const yourFoodSchema = new mongoose.Schema<IYourFood>(
  {
    foodComponents: [
      {
        food: { type: foodSchema, required: true },
        servings: { type: Number, default: 1 },
      },
    ],
    name: { type: String, required: true },
    servingSize: { type: String, required: true },
    calories: { type: Number, required: true },
    macros: {
      carbs: { type: Number, required: true },
      fat: { type: Number, required: true },
      protein: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

export const mealSchema = new mongoose.Schema<IMeal>(
  {
    mealComponents: [
      {
        food: {
          type: foodSchema || yourFoodSchema,
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
      carbs: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
    },
    calories: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  logs: [logSchema],
  calories: { type: Number, required: true },
  macros: {
    fat: { type: Number, required: true },
    carbs: { type: Number, required: true },
    protein: { type: Number, required: true },
  },
  yourFoods: [yourFoodSchema],
});

const User = mongoose.model('User', userSchema);

export default User;
