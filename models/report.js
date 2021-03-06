const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const ReportSchema = new Schema({
    thread: {
        type: Schema.Types.ObjectId,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId
    },
    message: {
        type: String, required: true
    }
}, {timestamps: true});

ReportSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('report', ReportSchema);
