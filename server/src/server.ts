import cors from 'cors';
import 'dotenv/config';
import express, { ErrorRequestHandler } from 'express';
import session from 'express-session';

import AppError from './app-error';
import connectDatabase from './db';

// Routers
import foodRouter from './routes/food';
import mealRouter from './routes/meal';
import userRouter from './routes/user';

const PORT = process.env.PORT ?? 3000;
const SECRET = process.env.SECRET as string;

const app = express();

app.use(session({ secret: SECRET, resave: false, saveUninitialized: false }));
app.use(express.json());
app.use(cors());

connectDatabase();

app.use('/api/foods', foodRouter);
app.use('/api/meals', mealRouter);
app.use('/api/user', userRouter);

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
  const errorMessage = err.errMessage || err;

  console.error(err);
  res.status(errorCode).json({ message: errorMessage });
}) as ErrorRequestHandler);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}.`);
});
