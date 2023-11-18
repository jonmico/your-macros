import express from 'express';
import 'dotenv/config';

const PORT = process.env.PORT;
const app = express();

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}.`);
});
