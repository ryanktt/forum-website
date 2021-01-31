const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    thread: {
        type: Schema.Types.ObjectId,
        ref: 'thread'
    },
    content: {
        type: String,
        required: true
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId
            }
        }
    ],
    unlikes: [
        {
            user: {
                type: Schema.Types.ObjectId
            }
        }
    ],
}, {timestamps: true});

module.exports = mongoose.model('post', PostSchema);
