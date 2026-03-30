import pg from "pg";
import dotenv from "dotenv";
import { seedData } from "../seedDatabase.js";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://med_management_user:6CXK40tkXdR8kxtT9oHVQ7emnqtr9fun@dpg-d72i120ule4c73e5sc5g-a.oregon-postgres.render.com/med_management",
  ssl: { rejectUnauthorized: false }
});

// Test connection on startup
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export async function initDb() {
  console.log("Attempting to connect to database...");
  try {
    const client = await pool.connect();
    console.log("Connected to database successfully");
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role TEXT DEFAULT 'staff' CHECK (role IN ('admin', 'staff', 'auditor')),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS medicines (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          quantity INTEGER DEFAULT 0,
          min_threshold INTEGER DEFAULT 10,
          batch TEXT,
          expiry DATE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS transactions (
          id SERIAL PRIMARY KEY,
          drug_id INTEGER REFERENCES medicines(id),
          user_id INTEGER REFERENCES users(id),
          type TEXT CHECK (type IN ('addition', 'usage')),
          quantity INTEGER NOT NULL,
          date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          notes TEXT
        );
      `);
      console.log("Database tables initialized");
      
      await seedData(client);
    } catch (err) {
      console.error("Error running initialization queries:", err);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("CRITICAL: Failed to connect to database. Check your DATABASE_URL environment variable.", err.message);
  }
}

export default pool;
