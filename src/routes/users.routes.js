import express from 'express';
import usersController from '../controllers/users.controller.js';
import jwtRequired from '../middlewares/jwt-required.middleware.js';

const router = express.Router();
const resource = 'users';

router.route(`/${resource}`)
    .get(jwtRequired, usersController.getAll)
    .post(usersController.create);

router.route(`/${resource}/:userId/conversations`)
    .get(jwtRequired, usersController.getAllConversations)
    .post(jwtRequired, usersController.createConversation);

export default router;
