import express from 'express';
import usersController from '../controllers/users.controller.js';
import jwtRequired from '../middlewares/jwt-required.middleware.js';
import validRequest from "../middlewares/valid-request.middleware.js";
import { userSetValidators } from '../validators/users.validator.js';

const router = express.Router();
const resource = 'users';

router.route(`/${resource}`)
    .get(jwtRequired, usersController.getAll)
    .post(userSetValidators, validRequest, usersController.create);

router.route(`/${resource}/:_id`)
    .put(jwtRequired, userSetValidators, validRequest, usersController.update)

export default router;
