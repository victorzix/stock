//Imports
import "dotenv/config";
import { connection } from "./database/db";
import app from "./app";

const port = process.env.SERVER_PORT || 3000;

try {
  app.listen(port, () => {
    console.log("listening on port " + port);
  });
} catch (err: any) {
  console.log("Unable to listen on port" + port, err.message);
}

connection();
