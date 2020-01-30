const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Router files
const bootcamps = require('./routes/bootcamps');

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps', bootcamps);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode, port: ${PORT}`.yellow
  );
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err}`.red);
  server.close(() => process.exit(1));
});
