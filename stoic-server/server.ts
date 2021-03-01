import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/config.env' });

process.on('uncaughtException', err => {
  console.log('Uncaught Exception! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

import app from './app';

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});
