import express from 'express';
import usersRoutes from './users.routes.js';
import authRoutes from './auth.routes.js';
import conversationsRoutes from './conversations.routes.js';

const router = express.Router();
const version = 'v1';
const prefix = `/api/${version}`;

router.use(prefix, usersRoutes);
router.use(prefix, authRoutes);
router.use(prefix, conversationsRoutes);

export default router;
