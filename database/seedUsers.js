require('dotenv').config();

const database = require('./index');
const PasswordService = require('../services/pwdServices');

const DEFAULT_USERS = [
  {
    name: process.env.SEED_ADMIN_NAME || 'System Admin',
    email: process.env.SEED_ADMIN_EMAIL || 'admin@crm.com',
    password: process.env.SEED_ADMIN_PASSWORD || 'Admin@123',
    role: 'admin'
  },
  {
    name: process.env.SEED_USER_NAME || 'System User',
    email: process.env.SEED_USER_EMAIL || 'user@crm.com',
    password: process.env.SEED_USER_PASSWORD || 'User@1234',
    role: 'user'
  }
];

const upsertUser = async (pool, user) => {
  const hashedPassword = await PasswordService.hashPassword(user.password);

  await pool.execute(
    `
      INSERT INTO users (name, email, password, role, is_verified)
      VALUES (?, ?, ?, ?, TRUE)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        password = VALUES(password),
        role = VALUES(role),
        is_verified = VALUES(is_verified),
        updated_at = CURRENT_TIMESTAMP
    `,
    [user.name, user.email, hashedPassword, user.role]
  );
};

const seedUsers = async () => {
  try {
    await database.initializeAllDatabases();

    const pool = database.mysql.getPool();

    for (const user of DEFAULT_USERS) {
      await upsertUser(pool, user);
      console.log(`Seeded ${user.role}: ${user.email}`);
    }

    console.log('User seed completed successfully.');
  } catch (error) {
    console.error('User seed failed:', error.message);
    process.exitCode = 1;
  } finally {
    try {
      const pool = database.mysql.getPool();
      await pool.end();
    } catch (closeError) {
      // Ignore pool close errors during script shutdown.
    }
  }
};

seedUsers();