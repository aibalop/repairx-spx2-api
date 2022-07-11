import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    conversationId: { type: mongoose.Schema.ObjectId, ref: 'Conversation', required: true },
    userId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
}, {
    timestamps: true,
});

const Message = mongoose.model('Message', messageSchema, 'messages');

export default Message;
