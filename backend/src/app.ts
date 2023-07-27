// Imports
import express, { Express, Request, Response } from 'express';

// Variables declarations
const app = express();


// app Routes

// app Configurations
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});



export default app;