import cors from 'cors';
import 'dotenv/config';
import express, { ErrorRequestHandler } from 'express';

import AppError from './app-error';
import connectDatabase from './db';

// Routers
import foodRouter from './routes/food';
import mealRouter from './routes/meal';

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.json());
app.use(cors());

connectDatabase();

app.use('/api/foods', foodRouter);
app.use('/api/meals', mealRouter);
// 404 error handler
app.use((req, res) => {
  res
    .status(404)
    .json({ message: "404 Error - We can't find what you are looking for." });
});

// Catch-all error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(((err, req, res, next) => {
  const errorCode = err instanceof AppError ? err.errCode : 500;
  const errorMessage = err.errMessage || 'Something went wrong.';

  res.status(errorCode).json({ message: errorMessage });
}) as ErrorRequestHandler);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}.`);
});
