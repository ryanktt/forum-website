const ProfileSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      require: true
    },
    description: {
        type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  
});

module.exports = mongoose.model('profile', ProfileSchema);