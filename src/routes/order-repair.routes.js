import express from 'express';
import orderRepairsController from '../controllers/order-repairs.controller.js';
import jwtRequired from '../middlewares/jwt-required.middleware.js';
import validRequest from '../middlewares/valid-request.middleware.js';
import { orderRepairsSetValidators, orderRepairUpdateSetValidators } from '../validators/order-repairs.validator.js';


const router = express.Router();
const resource = 'order-repairs';

router.route(`/${resource}`)
    .get(jwtRequired, orderRepairsController.getAll)
    .post(jwtRequired, orderRepairsSetValidators, validRequest, orderRepairsController.create);

router
    .route(`/${resource}/:_id`)
    .get(jwtRequired, orderRepairsController.getById)
    .put(jwtRequired, orderRepairUpdateSetValidators, validRequest, orderRepairsController.update)
    .delete(jwtRequired, orderRepairsController.destroy);

export default router;
