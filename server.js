const express = require('express');
const connectDB =  require('./config/db');
const jwt = require('jsonwebtoken');
const config = require('config');


const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



PORT = process.env.PORT || 5000
app.listen(5000, console.log(`server is running on port ${PORT}`));

//connect to db
connectDB();

//init body parser. allows to get the data in req.body
app.use(express.json({extended:false}))




app.get('/', (req, res, next) => {
    res.json({msg: 'server is running'})
})
//define routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/login', require('./routes/api/login'));
app.use('/api/profile', require('./routes/api/profile'));


//mongo "mongodb+srv://cluster0-csbwh.mongodb.net/test"  --username fiona123

//mongodb+srv://fiona123:<password>@cluster0-csbwh.mongodb.net/test?retryWrites=true&w=majority
