const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ChatSchema = new Schema({
    roomID: { type: String, required: true, unique: true }, 
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Message',
        // expiresAt: { type: Date, default: () => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), index: { expires: 0 } } 
    }]
}, { timestamps: true });

const ChatModel = model('Chat', ChatSchema);

module.exports = ChatModel;
