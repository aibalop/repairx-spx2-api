import express from 'express';
import devicesController from '../controllers/devices.controller.js';
import jwtRequired from '../middlewares/jwt-required.middleware.js';
import validRequest from '../middlewares/valid-request.middleware.js';
import { devicesSetValidators } from '../validators/devices.validator.js';


const router = express.Router();
const resource = 'devices';

router.route(`/${resource}`)
    .get(jwtRequired, devicesController.getAll)
    .post(jwtRequired, devicesSetValidators, validRequest, devicesController.create);

router
    .route(`/${resource}/:_id`)
    .get(jwtRequired, devicesController.getById)
    .put(jwtRequired, devicesSetValidators, validRequest, devicesController.update)
    .delete(jwtRequired, devicesController.destroy);

export default router;
