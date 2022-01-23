import express from "express";
import { getPosts, createPost, getPost } from "../controllers/posts.js";

const router = express.Router();

router.get("/posts", getPosts);
router.get("/post/:id", getPost);
router.post("/post", createPost);

export default router;
