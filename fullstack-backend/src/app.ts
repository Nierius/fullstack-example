import express from "express";
import { loadUserRoutes } from "./user.routes";
import helmet from "helmet";
import { connectToDB, createAndPrimeDbIfNotExists } from "./db/mongo";

connectToDB();
if (process.env.NODE_ENV?.toLowerCase() !== "production") {
  createAndPrimeDbIfNotExists();
}

const app = express();
const port = 3000;

app.use(helmet());
app.disable('x-powered-by');

loadUserRoutes(app);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
