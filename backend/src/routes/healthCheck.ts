import { Router, Request, Response } from "express";
import pool from "../db";
import logger from "../logger";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.status(200).json({ status: "OK", time: result.rows[0].now });
    logger.info("Database connection is healthy.");
  } catch (error) {
    logger.error("Database connection failed:", error);
    res
      .status(500)
      .json({ status: "Error", message: "Database connection failed" });
  }
});

export default router;
