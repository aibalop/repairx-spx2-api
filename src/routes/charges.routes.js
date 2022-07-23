import express from 'express';
import chargesController from '../controllers/charges.controller.js';
import jwtRequired from '../middlewares/jwt-required.middleware.js';

const router = express.Router();
const resource = 'charges';

router.route(`/${resource}`)
    .get(jwtRequired, chargesController.getAll)
    .post(jwtRequired, chargesController.create);

router
    .route(`/${resource}/:_id`)
    .get(jwtRequired, chargesController.getById)
    .put(jwtRequired, chargesController.update)
    .delete(jwtRequired, chargesController.destroy);

export default router;
