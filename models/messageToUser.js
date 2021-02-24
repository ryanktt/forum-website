const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2')

const MessageToUserSchema = new Schema({
    thread: {
        type: Schema.Types.ObjectId,
        ref: 'thread',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }

}, {timestamps: true});

MessageToUserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('messageToUser', MessageToUserSchema);
