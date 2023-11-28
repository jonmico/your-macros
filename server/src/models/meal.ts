import mongoose from 'mongoose';
import IMeal from '../types/meal';

const mealSchema = new mongoose.Schema<IMeal>(
  {
    mealComponents: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food',
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

const Meal = mongoose.model<IMeal>('Meal', mealSchema);

export default Meal;
