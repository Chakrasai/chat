const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MessageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    roomID: { type: String, required: true }, 
    content: { type: String, required: true , maxLength:500},
    expiresAt: { type: Date, default: () => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), index: { expires: 0 } } 
}, { timestamps: true });

const MessageModel = model('Message', MessageSchema);

module.exports = MessageModel;
