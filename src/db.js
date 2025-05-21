import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'stock_managment',
    password: 'barca1230/',
    port: 5432,
});

export default pool; 