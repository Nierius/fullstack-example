import express from "express";
import cors from 'cors';
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

app.use(cors());

app.use(express.json());

loadUserRoutes(app);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
