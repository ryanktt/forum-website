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
    category: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    posts: [
        {
            post: {
                type: Schema.Types.ObjectId,
                ref: 'post'
            }
        }
    ]
}, {timestamps: true});


ThreadSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('thread', ThreadSchema);
