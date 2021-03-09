const User = require('../models/user');
// middleware to check if user is admin
const checkAdmin  = async (req, res, next) => {

    try{
        const user = await User.findById(req.user.id).lean();
        if(user.settings.role !== 2) {
            res.status(403).json('Não Autorizado');
        }

        next();
    }catch(err) {
        console.error(err);
    }
};

module.exports = checkAdmin;
