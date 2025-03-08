const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MessageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    roomID: { type: String, required: true },
    content: { type: String, required: true, maxLength: 500 },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), index: { expires: 0 } }
}, { timestamps: true });

MessageSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

MessageSchema.pre('remove', async function (next) {
    try {
        await mongoose.model('Chat').updateMany(
            { messages: this._id },
            { $pull: { messages: this._id } }
        );
        next();
    } catch (error) {
        next(error);
    }
});

const MessageModel = model('Message', MessageSchema);
module.exports = MessageModel;
