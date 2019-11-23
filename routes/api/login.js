
const express =  require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const  {check, validationResult} =  require('express-validator');
const jwt = require('jsonwebtoken');
const config =  require('config');


//route - GET api/auth 
//desc - test route
//access - public
router.get('/', auth, async (req, res)=> {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)

    }catch(err) {
console.log(err.message);
res.status(500).send('server error')
    }
});


//route - POST api/login
//desc - aunthenticate user route
//access - public
router.post('/',  [
    check('email', 'Please include a valid email').not().isEmpty().isEmail()
 ],
  async (req, res) => {
    console.log(req.body)
    const {username, email, password, password2} = req.body;

    //errors result array
    const errors = validationResult(req);

    //validate input
    if(!errors.isEmpty()){return res.status(400).json({errors:errors.array()})}
    if(!email){res.send({msg:'You must enter an email address'})}
    if(!password){res.send({msg:'You must enter a password'})}
   

     //check if  user exist
    try {
        let user = await User.findOne({email});
//if it sends back a user
//add return if no user exists res.send or res.status
        if(!user){ return res.status(400).json({errors: [{msg:'User does not exist'} ] });}
        //check entered password against one in the db

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({errors:{ msg:'Invalid email or password'}})
        }
        


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



module.exports = router;

// user: test2 token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWRkODQ0MTU1NmRkYTY0YzBiYWM2ZGY2In0sImlhdCI6MTU3NDQ1NDI5MywiZXhwIjoxNTc0ODE0MjkzfQ.iM6r6ymLiZvaigBfFMIRJwTp-waCqr92-B4yUfRFEXY