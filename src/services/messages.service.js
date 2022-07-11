import Message from '../models/message.model.js';

const getMessages = async conversationId => {
  return Message.find({ conversationId })
    .populate('userId', '_id name lastName username')
    .sort({ createdAt: 1 });
};

const create = async (conversationId, userId, message) => {
  const newMessage = new Message({ conversationId, userId, message });
  return newMessage.save();
};

export default {
  getMessages,
  create,
};
