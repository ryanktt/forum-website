const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2')

const ThreadSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: [
        {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
        }
    ],
    unlikes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    posts: [
        {
            post: {
                type: Schema.Types.ObjectId,
                ref: 'post'
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

ThreadSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('thread', ThreadSchema);
