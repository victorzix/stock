// Imports
import express, { Express, Request, Response } from 'express';


// Variables declarations
const app:Express = express();
const port = process.env.PORT || 3000;

// app Routes

// app Configurations
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});

export default app;