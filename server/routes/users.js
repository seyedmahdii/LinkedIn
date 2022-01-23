import express from "express";
import { login, register } from "../controllers/auth.js";
import {
    getUsers,
    getUser,
    connectUser,
    getRelatedUsers,
} from "../controllers/users.js";

const router = express.Router();

// Auth
router.post("/register", register);
router.post("/login", login);

// Users
router.get("/", getUsers);
router.get("/:id", getUser);
router.patch("/:id/connect/:dest_id", connectUser);
router.get("/:id/related", getRelatedUsers);

export default router;
