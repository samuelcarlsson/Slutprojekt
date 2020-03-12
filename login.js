const bcrypt = require('bcryptjs')
const express = require('express')
const upload = require('express-fileupload')
const jwt = require('jsonwebtoken')
const secret = require("./secret")

module.exports = function(req,res,next){
    

    const users = require("./users")
    
    const user = users.filter(function(u){
    
    
    if(req.body.email === u.email)
        {
             return true
        }
    })


 if(user.length===1)
 {

    bcrypt.compare(req.body.password,user[0].password,function(err,success){
        if(success)
        {   
            let info ={email:user[0].email}
            
            let token = jwt.sign(info,secret,{expiresIn:"2h"})

            res.cookie("token",token,{maxAge:7200000,httpOnly:true,sameSite:"strict"})
            res.redirect("/index")
        }
        else
        {
            res.send("Fel lösenord")
        }

        })
 }
 else
 {
        res.send("Det finns ingen sådan användare")
 }
}
