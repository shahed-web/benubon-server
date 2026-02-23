import express, { type Application } from 'express';
import routes from './routes';
import { globalErrorHandler } from './middleware/error.middleware';
import middleware from './middleware';

export const app: Application = express();

// middleware comes before routes
middleware(app)

//  all routes
routes(app)

// global error handler
app.use(globalErrorHandler)