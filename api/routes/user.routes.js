import express from "express";
import { test } from "../controller/user.controller.js";
import { updateUser } from "../controller/user.controller.js";
import { verifyToken } from "../utils/verify.user.js";
import { deleteUser } from "../controller/user.controller.js";
import { signOutUser } from "../controller/user.controller.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", verifyToken, signOutUser);

export default router;
