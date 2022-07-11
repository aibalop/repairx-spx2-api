import express from 'express';
import usersController from '../controllers/users.controller.js';
import jwtRequired from '../middlewares/jwt-required.middleware.js';

const router = express.Router();
const prefix = 'users';

router.route(`/${prefix}`)
    .get(jwtRequired, usersController.getAll)
    .post(usersController.create);

router.route(`/${prefix}/:userId/conversations`)
    .get(jwtRequired, usersController.getAllConversations)
    .post(jwtRequired, usersController.createConversation);

export default router;
