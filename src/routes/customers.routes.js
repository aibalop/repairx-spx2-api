import express from 'express';
import customersController from '../controllers/customers.controller.js';
import jwtRequired from '../middlewares/jwt-required.middleware.js';
import validRequest from '../middlewares/valid-request.middleware.js';
import { customersSetValidators } from '../validators/customers.validator.js';

const router = express.Router();
const resource = 'customers';

router.route(`/${resource}`)
    .get(jwtRequired, customersController.getAll)
    .post(jwtRequired, customersSetValidators, validRequest, customersController.create);

router
    .route(`/${resource}/:_id`)
    .get(jwtRequired, customersController.getById)
    .put(jwtRequired, customersSetValidators, validRequest, customersController.update)
    .delete(jwtRequired, customersController.destroy);

export default router;
