import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbPath = path.join(process.cwd(), "data", "database.db");
const dbDir = path.dirname(dbPath);

// Ensure data directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Create database connection with proper configuration
const db = new Database(dbPath);

// Enable foreign keys
db.pragma("foreign_keys = ON");

// Enable WAL mode for better concurrency and immediate updates
// WAL mode allows readers to see changes immediately without blocking writers
db.pragma("journal_mode = WAL");

// Set busy timeout to handle concurrent access
db.pragma("busy_timeout = 5000");

// Enable synchronous mode for better data integrity (NORMAL is a good balance)
db.pragma("synchronous = NORMAL");

// Initialize database schema
export function initDatabase() {
  // Admin users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Blogs table
  db.exec(`
    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      image TEXT NOT NULL,
      date TEXT NOT NULL,
      author TEXT,
      read_time TEXT,
      category TEXT NOT NULL,
      tags TEXT NOT NULL,
      related_posts TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Projects table
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      location TEXT NOT NULL,
      category TEXT NOT NULL,
      image TEXT NOT NULL,
      sections TEXT NOT NULL,
      cta_prompt TEXT NOT NULL,
      cta_link_text TEXT NOT NULL,
      cta_href TEXT NOT NULL,
      display_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Reviews table
  db.exec(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project TEXT NOT NULL,
      quote TEXT NOT NULL,
      author TEXT NOT NULL,
      rating INTEGER NOT NULL DEFAULT 5,
      display_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Sessions table for secure authentication
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token TEXT UNIQUE NOT NULL,
      user_id INTEGER NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE CASCADE
    )
  `);

  // Login attempts table for rate limiting
  db.exec(`
    CREATE TABLE IF NOT EXISTS login_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      ip_address TEXT,
      attempted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      success INTEGER DEFAULT 0
    )
  `);

  // Create indexes
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
    CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
    CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(display_order);
    CREATE INDEX IF NOT EXISTS idx_reviews_order ON reviews(display_order);
    CREATE INDEX IF NOT EXISTS idx_sessions_token ON admin_sessions(token);
    CREATE INDEX IF NOT EXISTS idx_sessions_expires ON admin_sessions(expires_at);
    CREATE INDEX IF NOT EXISTS idx_login_attempts_email ON login_attempts(email);
    CREATE INDEX IF NOT EXISTS idx_login_attempts_time ON login_attempts(attempted_at);
  `);

  // Clean up expired sessions periodically
  db.exec(`
    DELETE FROM admin_sessions WHERE expires_at < datetime('now')
  `);

  // Clean up old login attempts (older than 1 hour)
  db.exec(`
    DELETE FROM login_attempts WHERE attempted_at < datetime('now', '-1 hour')
  `);
}

// Initialize database on import
initDatabase();

export default db;
