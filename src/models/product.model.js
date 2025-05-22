import pool from "../db.js";

export const addProduct = async ({name, description, quantity, price}) => {
    const result = await pool.query(
        `INSERT INTO products (name, description, quantity, price)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [name, description, quantity, price]
    );

    return result.rows[0];
}

export const getAllProducts = async(req, res) =>{
    const result = await pool.query(
        `SELECT * FROM products`
    );

    return result.rows;
}




