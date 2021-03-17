const User = require('../models/user');
// middleware to check user status (1 = normal, 2 = temporarily banned, 3 = permaban)
const checkStatus  = async (req, res, next) => {

    try{
        const user = await User.findById(req.user.id).select('settings');
        const allowAccessFrom = user.settings.allowAccessFrom;
        const status = user.settings.status;
        //check if ban time has passed
        if(status === 2) if(allowAccessFrom <= Date.now()) {
            user.settings.status = 1;
            await user.save();
            return next();
        }

        if(status > 1) {
            return res.status(403).json('Não Autorizado');
        }

        next();
    }catch(err) {
        console.error(err);
    }
};

module.exports = checkStatus;
