const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    settings: {
           role: {
               type: Number,
               default: 1
           },
           status: {
               type: Number,
               default: 1
           },
           allowAccessFrom: {
               type: Date,
               default:() => Date.now() - 7*24*60*60*1000
           }
    },
    ip: {
        type: String,
        required: true
    }

}, {timestamps: true});

module.exports = mongoose.model('user', UserSchema);