const express = require('express')
const app = express()
const bcrypt = require('bcryptjs')
const mongo = require('mongodb')
const html = require("./html")


async function main() {
    const con = await mongo.connect(connectionstring,{ useNewUrlParser: true, useUnifiedTopology: true });

    const db = await con.db("c1")

    const col = await db.collection("c2") 
    
    app.c2 = col  

    require("./index")(app)
}


app.get("/index", async function(req,res){
    try {
        const main = await app.c2.find().toArray()

        console.log(main)
        let html = main.reverse().map(function(inlägg){
        
        return `
        <h2>${inlägg.text}</h2><hr>
        <h3>${inlägg.bild}</h3><hr>
        <a href="/index/delete/${inlägg._id}"> Delete </a>          
        `               
        })
        
        res.send(html("Ditt flöde",html.join("")))

    } catch (error) {
        console.log(error)
        res.send("error!")
    }
})



app.use(express.urlencoded({extended:false}))

app.get("/login",function(req,res){
    res.sendFile(__dirname+"/main.html");
});

app.post("/login",function(req,res){
    res.redirect("/index")
})

app.listen(3456,function(){
    console.log("port = 3456")
})



app.get("/nytt", async function(req,res){
    res.sendFile(__dirname+"/index.html")
})
app.post("/nytt", async function(req,res){
    try {           
        await app.c2.insertOne(req.body)
        res.redirect("/index")                               
    } catch (error) {            
        res.send("creating error")
    }
}) 
