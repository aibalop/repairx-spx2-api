import express from 'express';
import conversationsController from '../controllers/conversations.controller.js';
import jwtRequired from '../middlewares/jwt-required.middleware.js';

const router = express.Router();
const prefix = 'conversations';

router
  .route(`/${prefix}/:conversationId`)
  .get(jwtRequired, conversationsController.getById);

router
  .route(`/${prefix}/:conversationId/messages`)
  .get(jwtRequired, conversationsController.getMessages)
  .post(jwtRequired, conversationsController.createMessage);

router
  .route(`/${prefix}/user-two/:userId`)
  .get(jwtRequired, conversationsController.getConversationWithUser);

export default router;
