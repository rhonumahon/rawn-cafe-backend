import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { join } from 'path';
import * as express from 'express';

mongoose.set('debug', true);

async function bootstrap() {
  console.log('(process.env.MONGO_URI :', process.env.MONGO_URI);


  // Check if the Quotaguard URL is provided in the environment variables
  const quotaguardUrl = process.env.QUOTAGUARDSHIELD_URL;
  if (quotaguardUrl) {
    const agent = new HttpsProxyAgent(quotaguardUrl);
    const axios = require('axios');
    axios.defaults.httpAgent = agent;
    axios.defaults.httpsAgent = agent;
    console.log('Using Quotaguard proxy:', quotaguardUrl);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully connected to MongoDB Atlas');
  } catch (error) {
    console.error('Mongoose connection error:', error);
  }

  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: [
      'https://rawncafe-3d7528568e5c.herokuapp.com/',
      'https://rawncafe.com',
      'https://www.rawncafe.com',
      'http://localhost:4362'
    ],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  // Serve Angular static files
  app.use(express.static(join(__dirname, '..', 'frontend')));

  // Set global prefix for API routes
  app.setGlobalPrefix('api');

  // Handle Angular routes fallback
  app.use((req, res, next) => {
    console.log(`Request URL: ${req.originalUrl}`);
    if (req.originalUrl.startsWith('/api')) {
      // Allow API requests to proceed
      return next();
    }
    // Fallback for Angular routes
    res.sendFile(join(__dirname, '..', 'frontend', 'index.html'));
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Application is running on: http://localhost:${process.env.PORT ?? 3000}`,
  );
}
bootstrap();
