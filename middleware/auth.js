const jwt = require('jsonwebtoken');
const config  =  require('config');

//middleware has access to res, response and does the next thing
module.exports = function(req, res, next){
//get token from header
const token = req.header('x-auth-token');
//check if theres no token
if(!token) {
    return res.status(401).json({msg:'no token authorisation denied'});
}
//veryfify token
try{

    const decoded = jwt.verify(token, config.get('jwtSecret'));

req.user = decoded.user;
next();

} catch (err){
    res.status(401).json({msg: 'token is invalid'})

}

}