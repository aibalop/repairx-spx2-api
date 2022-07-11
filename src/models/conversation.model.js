import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    userOneId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    userTwoId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Conversation = mongoose.model('Conversation', conversationSchema, 'conversations');

export default Conversation;
