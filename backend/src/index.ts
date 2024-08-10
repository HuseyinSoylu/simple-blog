import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import postRoutes from "./routes/posts";
import createTableRoute from "./routes/createTableRoute";
import healthCheckRoute from "./routes/healthCheck";
import seedRoute from "./routes/seedRoute";
import logger from "./logger";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use((req: Request, res: Response, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use("/api/posts", postRoutes);
app.use("/create-table", createTableRoute);
app.use("/health", healthCheckRoute);
app.use("/seed", seedRoute);

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});

app.use((err: Error, req: Request, res: Response, next: () => void) => {
  logger.error(`Error occurred: ${err.message}`);
  res.status(500).send("Internal Server Error");
});
