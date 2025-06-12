import express from "express";
const router = express.Router();
import { register, login, getUsers, getUser } from "../controllers/user.controller.js";
import { authenticateToken, authorizeRoles } from "../middleware/auth.middleware.js";

router.post('/register', register);
router.post('/login', login);
router.get('/', authenticateToken, authorizeRoles('admin'), getUsers);
router.get('/:id', authenticateToken, authorizeRoles('admin'), getUser);

export default router; 