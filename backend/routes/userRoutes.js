import { Router } from "express";
import { getUsers } from "../controllers/userController.js";
import { authenticateToken, isAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticateToken, isAdmin, getUsers);

export default router;
