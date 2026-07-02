const mysql = require("mysql2/promise");
const dbConfig = require("./dbProperties");

let pool = null;

const createPool = () => {
  if (!pool) {
    pool = mysql.createPool(dbConfig.mysql);
  }
  return pool;
};

const getConnection = async () => {
  const pool = createPool();
  return await pool.getConnection();
};

const testConnection = async () => {
  try {
    const connection = await getConnection();
    console.log(" MySQL Database connected successfully");
    connection.release();
    return true;
  } catch (error) {
    console.error("MySQL Database connection failed:", error.message);
    return false;
  }
};

const initializeDatabase = async () => {
  try {
    const connection = await getConnection();

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        is_verified BOOLEAN DEFAULT FALSE,
        refresh_token TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_refresh_token (refresh_token(255))
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        address TEXT,
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
        INDEX idx_email (email),
        INDEX idx_created_by (created_by)
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        source VARCHAR(100),
        status ENUM('new', 'contacted', 'qualified', 'converted', 'lost') DEFAULT 'new',
        notes TEXT,
        assigned_to INT,
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
        INDEX idx_email (email),
        INDEX idx_status (status),
        INDEX idx_assigned_to (assigned_to)
      )
    `);

    console.log("Database tables initialized successfully");

    // Safety check to ensure 'prospect' is part of the customer status ENUM
    try {
      await connection.query(`
        ALTER TABLE customers MODIFY COLUMN status ENUM('active', 'inactive', 'prospect') DEFAULT 'active'
      `);
      console.log("Database schema successfully checked/migrated");
    } catch (migrateError) {
      console.warn("Database schema migration warning:", migrateError.message);
    }

    connection.release();
    return true;
  } catch (error) {
    console.error("Database initialization failed:", error.message);
    throw error;
  }
};

module.exports = {
  getPool: createPool,
  getConnection,
  testConnection,
  initializeDatabase,
};
