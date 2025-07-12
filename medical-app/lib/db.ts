import mysql from 'mysql2/promise'

export const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  database: 'medai',  // hardcoded to match your existing database
  user: 'user',       // hardcoded to match your MySQL user
  password: 'vishql@123', // hardcoded to match your MySQL password
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

export async function createConnection() {
  try {
    console.log('Attempting to connect with config:', {
      host: dbConfig.host,
      user: dbConfig.user,
      database: dbConfig.database
    });
    const connection = await mysql.createConnection(dbConfig)
    return connection
  } catch (error) {
    console.error('Error connecting to the database:', error)
    throw error
  }
}
