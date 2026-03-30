import { z } from "zod";
import pool from "../config/db.js";

const transactionSchema = z.object({
  drug_id: z.number().int(),
  type: z.enum(['addition', 'usage']),
  quantity: z.number().int().positive(),
  notes: z.string().optional()
});

export const getTransactions = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT t.*, m.name as drug_name, u.name as user_name 
      FROM transactions t 
      JOIN medicines m ON t.drug_id = m.id 
      JOIN users u ON t.user_id = u.id 
      ORDER BY t.date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ error: "Internal server error. Database connection might be failing." });
  }
};

export const createTransaction = async (req, res) => {
  let client;
  try {
    const { drug_id, type, quantity, notes } = transactionSchema.parse(req.body);
    const user_id = req.user.id;
    client = await pool.connect();
    try {
      await client.query("BEGIN");
      
      const transResult = await client.query(
        "INSERT INTO transactions (drug_id, user_id, type, quantity, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [drug_id, user_id, type, quantity, notes]
      );

      const updateQuery = type === 'addition' 
        ? "UPDATE medicines SET quantity = quantity + $1 WHERE id = $2 RETURNING *"
        : "UPDATE medicines SET quantity = quantity - $1 WHERE id = $2 RETURNING *";
      
      const invResult = await client.query(updateQuery, [quantity, drug_id]);
      
      if (invResult.rows[0].quantity < 0) {
        await client.query("ROLLBACK");
        return res.status(400).json({ error: "Insufficient stock" });
      }

      await client.query("COMMIT");
      res.status(201).json(transResult.rows[0]);
    } catch (err) {
      if (client) await client.query("ROLLBACK");
      throw err;
    } finally {
      if (client) client.release();
    }
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: err.issues[0].message });
    console.error("Error creating transaction:", err);
    res.status(500).json({ error: "Internal server error. Database connection might be failing." });
  }
};
