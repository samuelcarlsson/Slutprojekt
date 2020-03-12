
module.exports = function(app,users,email){

    const bcrypt = require('bcryptjs')
    const objectId = require('mongodb').ObjectID;
    const render = require("./html")
    const login = require("./login")
    const upload = require('express-fileupload')
    const secret = require("./secret")
    const jwt = require('jsonwebtoken')

app.get("/index", async function(req,res){
    try {
        
        const main = await app.posts.find().toArray()

        console.log(main)
        let html = main.reverse().map(function(inlägg){
        
        return ` 
        <h3>${inlägg.user}</h3>       
        <h2>${inlägg.text}</h2>
        <img src = '${inlägg.image}'>
        <a href="/index/delete/${inlägg._id}"> Delete </a>
        <a href="/index/edit/${inlägg._id}"> Edit</a><hr>
        
        
        `               
        })
        
        res.send(render("Ditt flöde",html.join("")))

    } catch (error) {
        console.log(error)
        res.send("error!")
    }
})





app.get("/login",function(req,res){
    res.sendFile(__dirname+"/login.html");
});

app.post("/login",login,function(req,res){
    res.redirect("/index")
})


app.get("/profil", async function(req,res){
    res.sendFile(__dirname+"/profil.html")
})


app.get("/nytt", async function(req,res){
    res.sendFile(__dirname+"/index.html")
})
app.post("/nytt",getUser, async function(req,res){
    try {           
        
        req.files.image.mv(__dirname+"/images/"+req.files.image.name)
        await app.posts.insertOne({text:req.body.text,image:req.files.image.name,user:req.user})
        res.redirect("/index")                               
    } catch (error) {            
        app.posts.insertOne(req.body)
        res.redirect("/index")
    }
}) 

app.get("/index/delete/:id",async function(req,res){
    try {
        const id = req.params.id
        await app.posts.deleteOne({"_id":objectId(id)})
        res.redirect("/index")
    } catch (error) {
        res.send("delete error")
    }
})

app.get("/index/edit/:id",async function(req,res){
    try {
        const id = req.params.id
        const inlägg = await app.posts.findOne({"_id":objectId(id)})

        let html = `
        <form action="/index/update" method="post">
        <input type="text" name="text" value = "${inlägg.text}" placeholder="text">
        <br>
        <input type="file" accept="image/*" name="picture" value = "${inlägg.image}" placeholder="picture">
        <br>
        <input type="hidden" name="id" value="${id}">
        <input type="submit" value="Skicka inlägg">
        </form>
        `;
        res.send(render("Edit",html))
    } catch (error) {
        res.send("Edit error")
    }
})

app.post("/index/update", async function(req,res){
    try {
        const id = req.body.id
        const body = req.body
        delete body.id
        await app.posts.updateOne({"_id":objectId(id)},{$set:body})
        res.redirect("/index")
    
    } catch (error) {
        res.send("Error")
    }
});

app.get("/redigera", async function(req,res){
    res.sendFile(__dirname + "/redigera.html")
})
app.post("/redigera", async function(req,res){
    try {           
        req.files.image.mv(__dirname+"/images/"+req.files.image.name)
        await images.insertOne(__dirname + "/profil.html")
        res.redirect("/index")                               
    } catch (error) {            
        images.insertOne(req.body)
        res.redirect("/index")
    }
}) 
async function getUser(req,res,next){
    
    try {
        let token = req.cookies.token;
        token = await jwt.verify(token,secret);
        req.user = token.email;
        console.log(token);
        next(); 
    } catch (error) {
        res.send("auth error");
    }

}

}

