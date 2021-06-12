import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import routes from './lib/handlers/routes';
import { errorHandler } from './lib/handlers/errors';
import { checkAndcreateFilesDir } from './lib/util/helper';
import logger from './lib/util/logger';

checkAndcreateFilesDir()

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Service up and running...')
});

app.listen(PORT, () => {
  logger.info(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});