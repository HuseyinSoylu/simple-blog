import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

// Route to create the posts table
// GET /create-table
router.get("/", async (req: Request, res: Response) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(createTableQuery);
    res.status(200).send("Posts table created successfully.");
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(500).send("Error creating posts table.");
    } else {
      console.error("Unknown error", err);
      res.status(500).send("Unknown error creating posts table.");
    }
  }
});

export default router;
