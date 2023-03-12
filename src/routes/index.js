import express from 'express';
import usersRoutes from './users.routes.js';
import authRoutes from './auth.routes.js';
import chargesRoutes from './charges.routes.js';
import worksRoutes from './works.routes.js';
import customersRoutes from './customers.routes.js';
import devicesRoutes from './devices.routes.js';
import brandsRoutes from './brands.routes.js';
import orderRepairsRoutes from './order-repair.routes.js';
import dashboardRoutes from './dashboard.routes.js';

const router = express.Router();
const version = 'v1';
const prefix = `/api/${version}`;

router.use(prefix, usersRoutes);
router.use(prefix, authRoutes);
router.use(prefix, chargesRoutes);
router.use(prefix, worksRoutes);
router.use(prefix, customersRoutes);
router.use(prefix, devicesRoutes);
router.use(prefix, brandsRoutes);
router.use(prefix, orderRepairsRoutes);
router.use(prefix, dashboardRoutes);

export default router;
