const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const fs = require('fs');
const path = require('path');

async function initDB() {
  const db = await open({
    filename: path.join(__dirname, '../db/database.db'),
    driver: sqlite3.Database
  });

  // Membaca file schema.sql dan membuat tabel otomatis
  const schemaPath = path.join(__dirname, '../db/schema.sql');
  if (fs.existsSync(schemaPath)) {
    const schema = fs.readFileSync(schemaPath, 'utf8');
    await db.exec(schema);
  }

  return db;
}

module.exports = initDB;