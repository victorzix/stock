// Imports
import express, { Express, Request, Response } from 'express';
import router from './routes/product-routes';

// Variables declarations
const app = express();

//app uses
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app Routes
app.use(router)
// app Configurations
app.get('/', (req: Request, res: Response) => {
	res.send('Hello World');
});

export default app;
