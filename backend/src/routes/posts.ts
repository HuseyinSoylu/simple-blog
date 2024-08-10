import { Router, Request, Response } from "express";
import pool from "../db/db";

const router = Router();

interface Post {
  id: number;
  title: string;
  content: string;
}

/*
    Create a new post
    POST /posts
    Request Body: { title: string, content: string }
    Response: Returns the created post object with { id, title, content }
*/
router.post("/", async (req: Request, res: Response) => {
  const { title, content } = req.body;
  try {
    const newPost = await pool.query<Post>(
      "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );
    res.json(newPost.rows[0]);
  } catch (err) {
    console.error("Unknown error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/*
    Get all posts
    GET /posts
    Request: No parameters
    Response: Returns an array of all post objects [{ id, title, content }]
*/
router.get("/", async (_: Request, res: Response) => {
  try {
    const allPosts = await pool.query<Post>("SELECT * FROM posts");
    res.json(allPosts.rows);
  } catch (err) {
    console.error("Unknown error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/*
    Get a specific post
    GET /posts/:id
    Request Parameters: id (number) - The ID of the post to retrieve
    Response: Returns the post object with { id, title, content }
*/
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await pool.query<Post>("SELECT * FROM posts WHERE id = $1", [
      id,
    ]);
    if (post.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post.rows[0]);
  } catch (err) {
    console.error("Unknown error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/*
    Update a post
    PUT /posts/:id
    Request Parameters: id (number) - The ID of the post to update
    Request Body: { title: string, content: string }
    Response: Returns a success message "Post was updated!"
*/
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updateResult = await pool.query(
      "UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *",
      [title, content, id]
    );

    if (updateResult.rowCount === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json("Post was updated!");
  } catch (err) {
    console.error("Unknown error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/*
    Delete a post
    DELETE /posts/:id
    Request Parameters: id (number) - The ID of the post to delete
    Response: Returns a success message "Post was deleted!"
 */
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteResult = await pool.query(
      "DELETE FROM posts WHERE id = $1 RETURNING *",
      [id]
    );
    if (deleteResult.rowCount === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json("Post was deleted!");
  } catch (err) {
    console.error("Unknown error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
