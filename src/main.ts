import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';

mongoose.set('debug', true);

async function bootstrap() {
  console.log('(process.env.MONGO_URI :', process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully connected to MongoDB Atlas');
  } catch (error) {
    console.error('Mongoose connection error:', error);
  }
  // Continue with NestJS app initialization...

  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Allow requests from the Angular app running on localhost:4200
    methods: 'GET,POST,PUT,DELETE', // Allow these HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allow these headers
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
