import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import postRoutes from "./routes/posts";
import createTableRoute from "./routes/createTableRoute";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());
app.use("/api/posts", postRoutes);
app.use("/create-table", createTableRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
