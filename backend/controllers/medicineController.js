import { z } from "zod";
import pool from "../config/db.js";

const medicineSchema = z.object({
  name: z.string().min(2),
  quantity: z.number().int().nonnegative().optional(),
  min_threshold: z.number().int().nonnegative().optional(),
  batch: z.string().optional(),
  expiry: z.string().optional()
});

export const getInventory = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM medicines ORDER BY name ASC");
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createMedicine = async (req, res) => {
  const client = await pool.connect();
  try {
    const { name, quantity, min_threshold, batch, expiry } = medicineSchema.parse(req.body);
    await client.query("BEGIN");
    
    const result = await client.query(
      "INSERT INTO medicines (name, quantity, min_threshold, batch, expiry) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, quantity || 0, min_threshold || 10, batch, expiry]
    );
    
    const medicine = result.rows[0];

    if (medicine.quantity > 0) {
      await client.query(
        "INSERT INTO transactions (drug_id, user_id, type, quantity, notes) VALUES ($1, $2, $3, $4, $5)",
        [medicine.id, req.user.id, "addition", medicine.quantity, "Initial stock registration"]
      );
    }

    await client.query("COMMIT");
    res.status(201).json(medicine);
  } catch (err) {
    if (client) await client.query("ROLLBACK");
    if (err instanceof z.ZodError) return res.status(400).json({ error: err.issues[0].message });
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
};

export const updateMedicine = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, min_threshold, batch, expiry } = medicineSchema.partial().parse(req.body);
    const result = await pool.query(
      "UPDATE medicines SET name = COALESCE($1, name), min_threshold = COALESCE($2, min_threshold), batch = COALESCE($3, batch), expiry = COALESCE($4, expiry) WHERE id = $5 RETURNING *",
      [name, min_threshold, batch, expiry, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: "Medicine not found" });
    res.json(result.rows[0]);
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: err.issues[0].message });
    res.status(500).json({ error: "Internal server error" });
  }
};
