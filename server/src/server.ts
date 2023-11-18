import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDatabase from './db';

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.json());
app.use(cors());

connectDatabase();

// 404 error handler
app.use((req, res) => {
  res
    .status(404)
    .json({ message: "404 Error - We can't find what you are looking for." });
});

// Catch-all error handler

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}.`);
});
