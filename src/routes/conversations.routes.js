import express from 'express';
import conversationsController from '../controllers/conversations.controller.js';
import jwtRequired from '../middlewares/jwt-required.middleware.js';

const router = express.Router();
const resource = 'conversations';

router
  .route(`/${resource}/:conversationId`)
  .get(jwtRequired, conversationsController.getById);

router
  .route(`/${resource}/:conversationId/messages`)
  .get(jwtRequired, conversationsController.getMessages)
  .post(jwtRequired, conversationsController.createMessage);

router
  .route(`/${resource}/user-two/:userId`)
  .get(jwtRequired, conversationsController.getConversationWithUser);

export default router;
