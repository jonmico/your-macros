import mongoose from 'mongoose';
import IMeal from '../types/meal';

const mealSchema = new mongoose.Schema<IMeal>({
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
});

const Meal = mongoose.model<IMeal>('Meal', mealSchema);

export default Meal;
