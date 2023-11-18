import express from 'express';
import 'dotenv/config';

import connectDatabase from './db';

const PORT = process.env.PORT;
const app = express();

connectDatabase();

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}.`);
});
