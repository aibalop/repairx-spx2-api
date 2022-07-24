import express from 'express';
import customersController from '../controllers/customers.controller.js';
import jwtRequired from '../middlewares/jwt-required.middleware.js';

const router = express.Router();
const resource = 'customers';

router.route(`/${resource}`)
    .get(jwtRequired, customersController.getAll)
    .post(jwtRequired, customersController.create);

router
    .route(`/${resource}/:_id`)
    .get(jwtRequired, customersController.getById)
    .put(jwtRequired, customersController.update)
    .delete(jwtRequired, customersController.destroy);

export default router;
