const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    thread: {
        type: Schema.Types.ObjectId,
        ref: 'thread',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
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
