const express = require('express')
const app = express()
const mongo = require('mongodb')


async function main() {
    const con = await mongo.connect(connectionstring,{ useNewUrlParser: true, useUnifiedTopology: true });

    const db = await con.db("c1")

    const col = await db.collection("c2") 
    
    app.c2 = col  

    require("./index")(app)
}