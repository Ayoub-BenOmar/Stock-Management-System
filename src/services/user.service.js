import { createUser, findUserByEmail } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

// console.log('Root directory:', rootDir);
// console.log('Looking for .env in:', path.join(rootDir, '.env'));

dotenv.config({ path: path.join(rootDir, '.env') });
// console.log('After dotenv.config() - JWT_SECRET:', process.env.JWT_SECRET); 

const secret = process.env.JWT_SECRET;
if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

export const registerUser = async (username, email, password, role) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    const user = await createUser(username, email, password, role);
    return user;
};

export const loginUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        { userId: user.id, role: user.role },
        secret,
        { expiresIn: '1h' }
    );

    return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        token
    };
}; 