import sqlite3 from 'sqlite3'
import path from 'path'

import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = path.join(__dirname, 'task_db.sqlite')
const db = new sqlite3.Database(dbPath)
console.log("dbpath = "+dbPath);

const initDb = () => {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0
    );
  `).run()
}
/*
function initDb() {
    console.log(dbPath);
}*/
/*
module.exports = {
  db,
  initDb,
}*/

export {initDb};