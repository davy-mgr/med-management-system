import { Router } from "express";
import { getInventory, createMedicine, updateMedicine } from "../controllers/medicineController.js";
import { authenticateToken, isAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticateToken, getInventory);
router.post("/", authenticateToken, isAdmin, createMedicine);
router.patch("/:id", authenticateToken, updateMedicine);

export default router;
