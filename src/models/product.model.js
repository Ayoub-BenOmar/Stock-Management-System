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

export const getProductById = async(id) =>{
    const result = await pool.query(
        `SELECT * FROM products WHERE id = $1`,
        [id]
    );
    return result.rows[0];
}

export const updateProduct = async(id, {name, description, quantity, price}) =>{
    const result = await pool.query(
        `UPDATE products SET name = $1, description = $2, quantity = $3, price = $4 WHERE id = $5
        RETURNING *`,
        [name, description, quantity, price, id]
    );
    return result.rows[0];
}

export const deleteProduct = async(id) =>{
    const result = await pool.query(
        `DELETE FROM products WHERE id = $1`,
        [id]
    );
};






