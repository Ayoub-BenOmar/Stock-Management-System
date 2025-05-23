import pool from "../db.js";

export const addCategory = async (name) => {
    const result = await pool.query(
        `INSERT INTO categories (name) VALUES ($1) RETURNING *`,
        [name]
    )
    return result.rows[0];
}

export const deleteCategory = async(id) => {
    const result = await pool.query(
        `DELETE FROM categories WHERE id = $1`,
        [id]
    );
};

export const getAllCategories = async() => {
    const result = await pool.query(
        `SELECT * FROM categories`
    );

    return result.rows;
}