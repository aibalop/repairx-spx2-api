import { StatusCodes } from 'http-status-codes';
import usersService from '../services/users.service.js';
import conversationsService from '../services/conversations.service.js';

const create = async (req, res) => {
  try {
    const newUser = await usersService.create(req.body);
    res.status(StatusCodes.CREATED).json(newUser);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
  }
};

const getAll = async (req, res) => {
  try {
    const query = req.query ?? {};
    query['ignoreId'] = req.payload?._id;
    const users = await usersService.getAll(query);
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
  }
};

const getAllConversations = async (req, res) => {
  try {
    const query = req.query ?? {};
    query['userId'] = req.params.userId;
    const conversations = await conversationsService.getAll(query);
    res.status(StatusCodes.OK).json(conversations);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
  }
};

const createConversation = async (req, res) => {
  try {
    const { userId: senderUserId } = req.params;
    const { recipientUserId, message } = req.body;
    if (!recipientUserId || !message) {
      throw new Error('Campos faltantes (destinatario o mensaje)');
    }
    const conversation = await conversationsService.create(
      senderUserId,
      recipientUserId,
      message
    );
    res.status(StatusCodes.CREATED).json(conversation);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
  }
};

export default {
  create,
  getAll,
  getAllConversations,
  createConversation,
};
