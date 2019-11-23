//registering users
const express =  require('express');
const router = express.Router();
const  {check, validationResult} =  require('express-validator');
const User  = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');




//route - POST api/users
//desc - register route
//access - public
router.post('/',  [
    check('email', 'Please include a valid email').not().isEmpty().isEmail(),
    check('password', 'Enter a password with at least 6 characters').isLength({min: 6})
 ],
  async (req, res, next) => {
    console.log(req.body)
    const {username, email, password, password2} = req.body;

    //errors result array
    const errors = validationResult(req);

    //validate input
    if(!errors.isEmpty()){return res.status(400).json({errors:errors.array()})}
    if(!username){res.send({msg:'You must enter a name'})}
    if(!email){res.send({msg:'You must enter an email address'})}
    if(!password){res.send({msg:'You must enter a password'})}
    if(!password2){res.send({msg:'You must enter a confirmation password'})}
    if(password !== password2){res.send({msg:'Passwords must match'})}

     //check if  user exists
    try {
        let user = await User.findOne({email});
//if sends back a user
////add return if its not the last res.send or res.status
        if(user){ return res.status(400).json({errors: [{msg:'user already exists'} ] });
    }


    //creates a new intance of user, not saving
    user = new User({
        username, 
        email,  
        password
    })

     //encrypt password
const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(password, salt);
await user.save();

     //return json web token
    const payload = {
        user: {
            //we dont need to add the ._id as in mongo
            id: user.id
        }
    }
//payload is the data you send
    jwt.sign(payload, 
    config.get('jwtSecret'), 
    //expiration is optional
    {expiresIn:360000},
    (err, token) => {
        if(err) throw err;
        res.json({ token })
    })
    } catch(err){
        //gives a server error
        console.log(err.message);
        res.status(500).send('server error')

    }



})


module.exports = router;
