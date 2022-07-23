import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();
const resource = 'auth';

router.route(`/${resource}`)
    .post(authController.signIn);

export default router;
