import mongoose from 'mongoose';

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || '';

async function connectDatabase() {
  try {
    await mongoose.connect(CONNECTION_STRING);
    console.log('Successfully connected to the database.');
  } catch (err) {
    console.error(`Database connection error: ${err}`);
  }
}

export default connectDatabase;
