import mongoose from 'mongoose';
import IMeal from './meal';

export default interface ILog {
  _id: string;
  meals: IMeal[];
  author: mongoose.Schema.Types.ObjectId;
  name: string;
  macros: {
    carbs: number;
    fat: number;
    protein: number;
  };
  calories: number;
}
