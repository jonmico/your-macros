import mongoose, { Schema } from 'mongoose';
import IUser from '../types/user';

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

export default User;
