import express from 'express';
import dashboardController from '../controllers/dashboard.controller.js';
import jwtRequired from '../middlewares/jwt-required.middleware.js';

const router = express.Router();
const resource = 'dashboard';

router.route(`/${resource}/summary`)
    .get(jwtRequired, dashboardController.getSummary);

export default router;
