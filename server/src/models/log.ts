import mongoose, { Schema } from 'mongoose';
import ILog from '../types/log';
import { mealSchema } from './meal';

const logSchema = new Schema<ILog>({
  meals: [mealSchema],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Log = mongoose.model('Log', logSchema);

export default Log;
