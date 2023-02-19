import express from 'express';
import authController from '../controllers/auth.controller.js';
import jwtRequired from '../middlewares/jwt-required.middleware.js';
import validRequest from '../middlewares/valid-request.middleware.js';
import { changePasswordSetValidators } from '../validators/auth.validator.js';

const router = express.Router();
const resource = 'auth';

router.route(`/${resource}`)
    .post(authController.signIn);

router.route(`/${resource}/password`)
    .put(jwtRequired, changePasswordSetValidators, validRequest, authController.changePassword);

export default router;
