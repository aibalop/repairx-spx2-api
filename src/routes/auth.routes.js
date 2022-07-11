import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();
const prefix = 'auth';

router.route(`/${prefix}`)
    .post(authController.signIn);

export default router;
