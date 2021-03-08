const Post = require('../models/post');

// checks if a user is trying to like himself
const checkAction = (id) => async (req, res, next) => {
    try {

        const post = await Post.findById(req.params[id]).select('user').lean();
        console.log(post.user, req.user.id)
        if (req.user.id == post.user){
            return res.status(403).json({ msg: 'Não autorizado.' });
        }
        return next();
    } catch (err) {
        console.error(err);
    }
};

module.exports = checkAction;
