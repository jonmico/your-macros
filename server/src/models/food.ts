import mongoose from 'mongoose';
const { Schema } = mongoose;

const foodSchema = new Schema({
  name: { type: String, required: true },
  servingSize: { type: Number, required: true },
  macros: {
    carbs: { type: Number, required: true },
    fat: { type: Number, required: true },
    protein: { type: Number, required: true },
  },
});

const Food = mongoose.model('Food', foodSchema);

export default Food;
