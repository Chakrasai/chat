const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ChatCreationSchema = new Schema({
  roomID: { type: String, required: true, unique: true }
}, { timestamps: true });

const ChatCreationModel = model('ChatCreation', ChatCreationSchema);

module.exports = ChatCreationModel;
