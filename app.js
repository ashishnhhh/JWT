const express = require ("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req,res) => {
    res.json({
        message:"hi this is jwt json"
    })
});

app.post("/api/post", verifyToken ,(req,res)=>{

    jwt.verify(req.token, "secretkey",(err, authData)=>{
        if(err){
            res.sendStatus(403);
        }else {
            res.json({
                message:"post created....",
                authData
            });
        }
    });
});

app.post("/api/login", (req,res)=>{
    const user = {
        id:1,
        Username:"AashishNhansbhavi",
        email:"ashish@gmail.com"
    };

jwt.sign({user:user},"secretkey", (err, token)=>{
    res.json({
        token,
    })
})
});

function verifyToken(req,res,next){
    const bearerheader  = req.headers['authorization']

    if(typeof bearerheader !== 'undefined' ){
        const bearerTokens = bearerheader.split(" ")[1]
        req.token = bearerTokens;
        next();
    }else{
        res.sendStatus(403);
    }
}

app.listen(4000, (req,res) => {
    console.log('server started');
})