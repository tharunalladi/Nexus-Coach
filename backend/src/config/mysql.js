const mysql = require('mysql2/promise');

// 1. Create a connection to MySQL server to ensure database exists
const initializeDatabase = async () => {
    try {
        const rootConnection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '',
        });

        // Create the database if it doesn't exist
        const dbName = process.env.DB_NAME || 'nexus_coach';
        await rootConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        console.log(`✅ Database \`${dbName}\` is ready.`);
        await rootConnection.end();

        // 2. Create the main connection pool to the specific database
        const pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '',
            database: dbName,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });

        // 3. Auto-create tables if they don't exist

        // Users Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id VARCHAR(36) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                targetExam VARCHAR(50),
                targetYear INT,
                weeklyStudyHours INT NULL,
                weakSubjects JSON NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Safely alter existing table to add new columns if they don't exist
        try {
            await pool.query(`ALTER TABLE users ADD COLUMN weeklyStudyHours INT NULL`);
        } catch (e) { /* Ignore if exists */ }
        try {
            await pool.query(`ALTER TABLE users ADD COLUMN weakSubjects JSON NULL`);
        } catch (e) { /* Ignore if exists */ }

        // OTP Store Table (Used for registration)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS otps (
                email VARCHAR(255) PRIMARY KEY,
                code VARCHAR(10) NOT NULL,
                expiresAt BIGINT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('✅ MySQL tables ready (users, otps).');
        return pool;

    } catch (error) {
        console.error('❌ Failed to connect to MySQL. Is XAMPP/WAMP running?', error);

        // Return a mock pool so the app doesn't crash completely, but warns you.
        return {
            query: async () => [[]],
            execute: async () => [[]],
            getConnection: async () => ({
                query: async () => [[]],
                release: () => { },
            }),
        };
    }
};

// Create a singleton instance
let poolInstance = null;
const getPool = async () => {
    if (!poolInstance) {
        poolInstance = await initializeDatabase();
    }
    return poolInstance;
};

// Also export a synchronous query wrapper for convenience where async init is handled
const query = async (sql, params) => {
    const pool = await getPool();
    return pool.query(sql, params);
};

module.exports = { getPool, query };
