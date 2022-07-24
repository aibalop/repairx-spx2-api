import express from 'express';
import usersRoutes from './users.routes.js';
import authRoutes from './auth.routes.js';
import chargesRoutes from './charges.routes.js';
import worksRoutes from './works.routes.js';
import customersRoutes from './customers.routes.js';

const router = express.Router();
const version = 'v1';
const prefix = `/api/${version}`;

router.use(prefix, usersRoutes);
router.use(prefix, authRoutes);
router.use(prefix, chargesRoutes);
router.use(prefix, worksRoutes);
router.use(prefix, customersRoutes);

export default router;
