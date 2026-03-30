import { Router } from "express";
import { getTransactions, createTransaction } from "../controllers/transactionController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticateToken, getTransactions);
router.post("/", authenticateToken, createTransaction);

export default router;
