const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.get('/api',(req,res) => {
    res.json({
        message:"Welcome to the JWT example"
    });
});



app.post('/api/posts', tokenVerify,(req,res) => {

    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
            console.log(err)
        }else{
            res.json({
                message:"Post data...",
                authData
             });
        }
    });
});


app.post('/api/login',(req,res)=>{
    //Mocking the user
    const user = {
        id:1,
        username:'brad',
        email:'brad@gmail.com'
    }

    jwt.sign({user:user},'secretkey',(err,token)=>{  
        if(err){
            res.sendStatus(404);
            console.log(err)
        }else{
        res.json({
            token
        });
        }
    });
})


// Verify Token
function tokenVerify(req,res,next) {
    // Get auth value
    const bearerHeader = req.headers['authorization']; //authorization
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //split at the space
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        // Next Middleware
        next();

    } else {
        //Forbidden
        res.sendStatus(403);           
        }
    }

app.listen(5000,()=> console.log('Server started on port 5000'));
