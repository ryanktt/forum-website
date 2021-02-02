const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    jwt.verify(
        token, 
        process.env.JWT_SECRET,
        function(err, decoded) {
            if(err) {
                if(err.message === 'invalid token') {
                    return res.status(401).json({errors: [{msg: 'Not authorized'}]});
                }
                
                return res.status(500).json({msg: 'Server Error'});
            }
            console.log(decoded)
            req.user = decoded.user;
            next();
        }
    )
    
    
}

module.exports = auth;