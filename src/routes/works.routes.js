import express from 'express';
import worksController from '../controllers/works.controller.js';
import jwtRequired from '../middlewares/jwt-required.middleware.js';

const router = express.Router();
const resource = 'works';

router.route(`/${resource}`)
    .get(jwtRequired, worksController.getAll)
    .post(jwtRequired, worksController.create);

router
    .route(`/${resource}/:_id`)
    .get(jwtRequired, worksController.getById)
    .put(jwtRequired, worksController.update)
    .delete(jwtRequired, worksController.destroy);

export default router;
