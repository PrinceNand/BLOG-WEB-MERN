import express from "express";
import { verifyToken } from "../utils/verify.user.js";
import { createComment } from "../controller/comment.controller.js";
import { getPostComments } from "../controller/comment.controller.js";
import { likeComment } from "../controller/comment.controller.js";
import { editComment } from "../controller/comment.controller.js";
import { deleteComment } from "../controller/comment.controller.js";
import { getcomments } from "../controller/comment.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getPostComments/:postId", getPostComments);
router.put("/likeComment/:commentId", verifyToken, likeComment);
router.put("/editComment/:commentId", verifyToken, editComment);
router.delete("/deleteComment/:commentId", verifyToken, deleteComment);
router.get("/getcomments", verifyToken, getcomments);

export default router;
