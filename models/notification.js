const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const NotificationSchema = new Schema({
    recipient: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    sender: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'user'
    },
    type: {
        type: String, required: true //comment, mention, quote
    },
    thread: {
        type: JSON,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});


NotificationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('notification', NotificationSchema);
