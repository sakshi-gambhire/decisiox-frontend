import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes("neon")
    ? { rejectUnauthorized: false }
    : false
});

// Test connection
pool.connect()
  .then(client => {
    console.log("PostgreSQL Connected Successfully");
    client.release();
  })
  .catch(err => {
    console.error("Database Connection Failed:", err);
  });

export default pool;