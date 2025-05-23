import pool from "../db.js";
import bcrypt from "bcrypt";

export const createUser = async (username, email, password, role = 'employee') => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await pool.query(
        `INSERT INTO users (username, email, password, role) 
         VALUES ($1, $2, $3, $4) 
         RETURNING id, username, email, role`,
        [username, email, hashedPassword, role]
    );
    return result.rows[0];
};

export const findUserByEmail = async (email) => {
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );
    return result.rows[0];
};

export const findUserById = async (id) => {
    const result = await pool.query(
        `SELECT id, username, email, role FROM users WHERE id = $1`,
        [id]
    );
    return result.rows[0];
}; 