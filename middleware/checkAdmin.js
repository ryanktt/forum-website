const User = require('../models/user');
// middleware to check if user is admin
const checkAdmin  = (req, res, next) => {
    const user = await User.findById(req.user.id).select('settings').lean();

    if(user.settings.role !== 2) {
        res.status(403).json('Não Autorizado');
    }

    next();
};

module.exports = checkAdmin;
