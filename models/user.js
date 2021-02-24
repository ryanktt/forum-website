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
    profile: {
        description: {
            type: String,
            default: ''
        },
        userImg: {
          type: String,
          default: 'https://i.imgur.com/aFUANXE.png'
        },
        postCount: {type: Number, default: 0},
        threadCount: {type: Number, default: 0},
        likes: {
            type: Number,
            default: 0
        },
        dislikes: {
            type: Number,
            default: 0
        }
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

}, {timestamps: true}, {strict: false});

module.exports = mongoose.model('user', UserSchema);