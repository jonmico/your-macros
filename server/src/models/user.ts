import mongoose, { Schema } from 'mongoose';
import IUser from '../types/user';
import ILog from '../types/log';
import { mealSchema } from './meal';

const logSchema = new Schema<ILog>({
  meals: [mealSchema],
  name: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  logs: [logSchema],
});

const User = mongoose.model('User', userSchema);

export default User;
