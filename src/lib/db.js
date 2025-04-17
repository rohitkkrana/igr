import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function query(sql, values) {
  try {
    let processedValues = []
    // Convert values to strings if they're numbers
    if(values){
     processedValues = values.map(value => {
      if (typeof value === 'number') {
        return value.toString();
      }
      return value;
    });
  }

    const [results] = await pool.execute(sql, processedValues);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export default pool; 