const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

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
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public'
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId
            }
        }
    ],
    dislikes: [
        {
            user: {
                type: Schema.Types.ObjectId
            }
        }
    ],
}, {timestamps: true});

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('post', PostSchema);
