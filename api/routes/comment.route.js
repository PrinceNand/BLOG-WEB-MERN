import express from "express";
import { verifyToken } from "../utils/verify.user.js";
import { createComment } from "../controller/comment.controller.js";
import { getPostComments } from "../controller/comment.controller.js";
import { likeComment } from "../controller/comment.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getPostComments/:postId", getPostComments);
router.put("/likeComment/:commentId", verifyToken, likeComment);

export default router;
