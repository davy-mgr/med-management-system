import bcrypt from "bcryptjs";

export async function seedData(client) {
  console.log("Checking database for initial data...");

  // Seed Users if they don't exist
  const adminCheck = await client.query("SELECT id FROM users WHERE email = $1", ["admin@trackdrug.com"]);
  if (adminCheck.rows.length === 0) {
    console.log("Seeding admin user...");
    const adminPassword = await bcrypt.hash("admin123", 10);
    await client.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
      ["System Admin", "admin@trackdrug.com", adminPassword, "admin"]
    );
  }

  const staffCheck = await client.query("SELECT id FROM users WHERE email = $1", ["staff@trackdrug.com"]);
  if (staffCheck.rows.length === 0) {
    console.log("Seeding staff user...");
    const staffPassword = await bcrypt.hash("staff123", 10);
    await client.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
      ["Healthcare Staff", "staff@trackdrug.com", staffPassword, "staff"]
    );
  }

  // Check if medicines already exist
  const medCount = await client.query("SELECT COUNT(*) FROM medicines");
  if (parseInt(medCount.rows[0].count) > 0) {
    console.log("Medicines already exist, skipping medicine seed.");
    return;
  }

  const adminRes = await client.query("SELECT id FROM users WHERE email = $1", ["admin@trackdrug.com"]);
  const staffRes = await client.query("SELECT id FROM users WHERE email = $1", ["staff@trackdrug.com"]);
  const adminId = adminRes.rows[0].id;
  const staffId = staffRes.rows[0].id;

  // Seed Medicines
  const medicines = [
    ["Paracetamol 500mg", 500, 50, "BATCH-001", "2027-12-31"],
    ["Amoxicillin 250mg", 120, 30, "BATCH-002", "2026-06-15"],
    ["Ibuprofen 400mg", 8, 20, "BATCH-003", "2026-03-20"], // Low stock
    ["Artemether/Lumefantrine", 250, 40, "BATCH-004", "2027-01-10"],
    ["Metformin 500mg", 300, 50, "BATCH-005", "2028-05-22"],
    ["Amlodipine 5mg", 15, 25, "BATCH-006", "2026-04-01"], // Low stock
    ["Oral Rehydration Salts", 1000, 100, "BATCH-007", "2029-01-01"],
    ["Ciprofloxacin 500mg", 45, 20, "BATCH-008", "2026-08-12"],
    ["Insulin Glargine", 12, 10, "BATCH-009", "2026-05-30"],
    ["Albendazole 400mg", 200, 50, "BATCH-010", "2027-09-18"]
  ];

  for (const [name, qty, threshold, batch, expiry] of medicines) {
    const res = await client.query(
      "INSERT INTO medicines (name, quantity, min_threshold, batch, expiry) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [name, qty, threshold, batch, expiry]
    );
    
    const drugId = res.rows[0].id;

    // Seed initial transaction for each medicine
    await client.query(
      "INSERT INTO transactions (drug_id, user_id, type, quantity, notes) VALUES ($1, $2, $3, $4, $5)",
      [drugId, adminId, "addition", qty, "Initial stock intake"]
    );
  }

  // Add some usage transactions
  const usageTransactions = [
    [1, staffId, "usage", 20, "Patient prescription"],
    [2, staffId, "usage", 15, "Emergency ward use"],
    [4, staffId, "usage", 10, "Routine distribution"]
  ];

  for (const [drugId, userId, type, qty, notes] of usageTransactions) {
    await client.query(
      "INSERT INTO transactions (drug_id, user_id, type, quantity, notes) VALUES ($1, $2, $3, $4, $5)",
      [drugId, userId, type, qty, notes]
    );
    
    // Update medicine quantity
    await client.query(
      "UPDATE medicines SET quantity = quantity - $1 WHERE id = $2",
      [qty, drugId]
    );
  }

  console.log("Seeding completed successfully.");
}
