import express from 'express';
import companiesController from '../controllers/companies.controller.js';
import jwtRequired from '../middlewares/jwt-required.middleware.js';
import validRequest from '../middlewares/valid-request.middleware.js';
import { companySetValidators } from '../validators/companies.validator.js';

const router = express.Router();
const resource = 'companies';

router
    .route(`/${resource}/:_id`)
    .get(jwtRequired, companiesController.getById);

router
    .route(`/${resource}/:_id`)
    .put(jwtRequired, companySetValidators, validRequest, companiesController.update);

export default router;
