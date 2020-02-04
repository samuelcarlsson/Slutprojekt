const bcrypt = require('bcryptjs')
const express = require('express')

if(user.length===1)
{

    bcrypt.compare(req.body.password,user[0].password,function(err,success){
        if(success)
        {             
            res.send("login success!")
        }
        else
        {
            res.send("wrong password")
        }

        })
}
else
{
        res.send("no such user")
}

