import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import conversationsService from '../services/conversations.service.js';
import messagesService from '../services/messages.service.js';

const { isValidObjectId } = mongoose;

const getById = async (req, res) => {
  try {
    const conversation = await conversationsService.getById(
      req.params.conversationId
    );
    if (!conversation) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'No se encontro la conversación' });
    }
    res.status(StatusCodes.OK).json(conversation);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
  }
};

const getConversationWithUser = async (req, res) => {
  try {
    const { _id: userOneId } = req.payload;
    const { userId: userTwoId } = req.params;
    const conversation = await conversationsService.getByUserOneAndUserTwo(
      userOneId,
      userTwoId
    );
    if (!conversation) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'No se encontro una conversación entre los usuarios',
      });
    }
    res.status(StatusCodes.OK).json(conversation);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
  }
};

const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    if (!conversationId || !isValidObjectId(conversationId)) {
      throw new Error('El ID de la conversación no es válido');
    }
    const messages = await messagesService.getMessages(conversationId);
    res.status(StatusCodes.OK).json(messages);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
  }
};

const createMessage = async (req, res) => {
  try {
    const conversation = await conversationsService.getById(
      req.params.conversationId
    );
    if (!conversation) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'No se encontro la conversación' });
    }
    const { message } = req.body;
    const { _id: userId } = req.payload;
    if (!userId) {
      throw new Error('No se indentifica el usuario que hace la petición');
    }
    if (!message || !message.trim()) {
      throw new Error('No se encontro un mensaje que enviar');
    }
    const messageCreated = await messagesService.create(
      conversation._id,
      userId,
      message
    );
    res.status(StatusCodes.CREATED).json(messageCreated);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
  }
};

export default {
  getById,
  getConversationWithUser,
  getMessages,
  createMessage,
};
