//const { db } = require('./database/task_db')
import sqlite3 from 'sqlite3'
import path from 'path'

import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = path.join(__dirname, 'task_db.sqlite')
const db = new sqlite3.Database(dbPath)

class Todo {
  constructor(text, completed = false) {
    this.text = text
    this.completed = completed
  }

  save() {
    console.log("db.save() " + this.text + " " + this.completed)
    const stmt = db.prepare(`
      INSERT INTO todos (text, completed)
      VALUES (?, ?)
    `)
    stmt.run(this.text, this.completed ? 1 : 0)
  }

  findAll() {
    /*
    const stmt = db.prepare(`
      SELECT *
      FROM todos
    `)
    const rows = stmt.all()
    console.log("todo.findAll().rows.len =  " + JSON.stringify(rows));

    return rows.map(row => new Todo(row.text, row.completed))
    */
   db.all("select * from todos", function(err, rows){
      console.log(JSON.stringify(rows));
   })
  }

  static findById(id) {
    const stmt = db.prepare(`
      SELECT *
      FROM todos
      WHERE id = ?
    `)
    const row = stmt.get(id)
    return row ? new Todo(row.text, row.completed) : null
  }

  update() {
    const stmt = db.prepare(`
      UPDATE todos
      SET text = ?, completed = ?
      WHERE id = ?
    `)
    stmt.run(this.text, this.completed ? 1 : 0, this.id)
  }

  delete() {
    const stmt = db.prepare(`
      DELETE FROM todos
      WHERE id = ?
    `)
    stmt.run(this.id)
  }
}

//module.exports = Todo
export {Todo};
