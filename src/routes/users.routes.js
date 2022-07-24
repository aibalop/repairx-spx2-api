import express from 'express';
import usersController from '../controllers/users.controller.js';
import jwtRequired from '../middlewares/jwt-required.middleware.js';

const router = express.Router();
const resource = 'users';

router.route(`/${resource}`)
    .get(jwtRequired, usersController.getAll)
    .post(usersController.create);

export default router;
