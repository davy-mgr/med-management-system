import pool from "../config/db.js";

export const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC");
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};
