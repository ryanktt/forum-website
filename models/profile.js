const ProfileSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      require: true
    },
    description: {
        type: String
    }
  
}, {timestamps: true});

module.exports = mongoose.model('profile', ProfileSchema);