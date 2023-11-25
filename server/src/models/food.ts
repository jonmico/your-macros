import mongoose from 'mongoose';
import IFood from '../types/food';

const foodSchema = new mongoose.Schema<IFood>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  servingSize: { type: Number, required: true },
  calories: { type: Number, required: true },
  macros: {
    carbs: { type: Number, required: true },
    fat: { type: Number, required: true },
    protein: { type: Number, required: true },
  },
});

const Food = mongoose.model<IFood>('Food', foodSchema);

export default Food;
