import express from 'express';
import brandsController from '../controllers/brands.controller.js';
import jwtRequired from '../middlewares/jwt-required.middleware.js';
import validRequest from '../middlewares/valid-request.middleware.js';
import { brandsSetValidators } from '../validators/brands.validator.js';


const router = express.Router();
const resource = 'brands';

router.route(`/${resource}`)
    .get(jwtRequired, brandsController.getAll)
    .post(jwtRequired, brandsSetValidators, validRequest, brandsController.create);

router
    .route(`/${resource}/:_id`)
    .get(jwtRequired, brandsController.getById)
    .put(jwtRequired, brandsSetValidators, validRequest, brandsController.update)
    .delete(jwtRequired, brandsController.destroy);

export default router;
