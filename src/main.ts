import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';
import { HttpsProxyAgent } from 'https-proxy-agent'; // Correct import for the class

mongoose.set('debug', true);

async function bootstrap() {
  console.log('(process.env.MONGO_URI :', process.env.MONGO_URI);

  // Check if the Quotaguard URL is provided in the environment variables
  const quotaguardUrl = process.env.QUOTAGUARDSHIELD_URL;
  if (quotaguardUrl) {
    // Create an instance of HttpsProxyAgent with the Quotaguard URL
    const agent = new HttpsProxyAgent(quotaguardUrl);

    // Apply this proxy agent globally to Axios or any HTTP request library
    // eslint-disable-next-line @typescript-eslint/no-require-imports
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

  // Initialize NestJS app
  const app = await NestFactory.create(AppModule);

  // Enable CORS (this allows communication with your frontend)
  app.enableCors({
    origin: 'http://localhost:4200', // Allow requests from the Angular app running on localhost:4200
    methods: 'GET,POST,PUT,DELETE', // Allow these HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allow these headers
  });

  // Start the application
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
