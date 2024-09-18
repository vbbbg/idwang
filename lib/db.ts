import Database from 'better-sqlite3'

// 创建或打开数据库文件
const db = new Database('user.db', { verbose: console.log })

// 创建一个 SQL 语句来创建表
const createTableStmt = db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phoneNumber TEXT UNIQUE,
    password TEXT NOT NULL
  )
`)
// 执行 SQL 语句来创建表
createTableStmt.run()

const createTableSession = db.prepare(`
    CREATE TABLE IF NOT EXISTS sessions (
        id TEXT NOT NULL PRIMARY KEY,
        expires_at INTEGER NOT NULL,
        user_id TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
`)
createTableSession.run()

export default db
