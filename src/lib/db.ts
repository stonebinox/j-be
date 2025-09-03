import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";

const dbPath = path.resolve(__dirname, "../../data/jouster.db");

export async function getDb(): Promise<Database> {
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}

export async function initDb() {
  const db = await getDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_input TEXT NOT NULL,
      summary TEXT,
      title TEXT,
      topics TEXT,
      sentiment TEXT,
      keywords TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await db.close();
}
