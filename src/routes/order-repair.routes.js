import express from 'express';
import orderRepairsController from '../controllers/order-repairs.controller.js';
import jwtRequired from '../middlewares/jwt-required.middleware.js';
import validRequest from '../middlewares/valid-request.middleware.js';
import {
    orderRepairsSetValidators,
    orderRepairUpdatePaymentSetValidators,
    orderRepairUpdateStatusDeviceSetValidators,
    orderRepairUpdateStatusSetValidators,
} from '../validators/order-repairs.validator.js';


const router = express.Router();
const resource = 'order-repairs';

router.route(`/${resource}`)
    .get(jwtRequired, orderRepairsController.getAll)
    .post(jwtRequired, orderRepairsSetValidators, validRequest, orderRepairsController.create);

router
    .route(`/${resource}/:_id`)
    .get(jwtRequired, orderRepairsController.getById)
    .delete(jwtRequired, orderRepairsController.destroy);

router.route(`/${resource}/order-id/:orderId`)
    .get(jwtRequired, orderRepairsController.getByOrderId);

router.route(`/${resource}/:_id/payment`)
    .put(jwtRequired, orderRepairUpdatePaymentSetValidators, validRequest, orderRepairsController.update);

router.route(`/${resource}/:_id/status`)
    .put(jwtRequired, orderRepairUpdateStatusSetValidators, validRequest, orderRepairsController.update);

router.route(`/${resource}/:_id/status-device`)
    .put(jwtRequired, orderRepairUpdateStatusDeviceSetValidators, validRequest, orderRepairsController.updateStatusDevice);

export default router;
