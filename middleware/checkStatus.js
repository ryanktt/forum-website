const User = require('../models/user');
// middleware to check user status (1 = normal, 2 = temporarily banned, 3 = permaban)
const checkAdmin  = async (req, res, next) => {
    //const user = await User.findById(req.user.id).select('settings');

    if(req.user.settings.status === 3) {
        return res.status(403).json('Não Autorizado');
    }

    if(req.user.settings.allowAccessFrom <= Date.now()) {
        req.user.settings.status = 1;
        await user.save();
        return next();
    }

    if(req.user.settings.status > 1) {
        return res.status(403).json('Não Autorizado');
    }

    next();
};

module.exports = checkAdmin;
