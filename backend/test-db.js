const pool = require("./db");

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Connected!");
    console.log(result.rows);
  } catch (error) {
    console.error("Connection failed:");
    console.error(error.message);
  }
}

testConnection();

