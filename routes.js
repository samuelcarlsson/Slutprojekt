
module.exports = function(app){

    const bcrypt = require('bcryptjs')
    const objectId = require('mongodb').ObjectID;
    const render = require("./html")


app.get("/index", async function(req,res){
    try {
        const main = await app.posts.find().toArray()

        console.log(main)
        let html = main.reverse().map(function(inlägg){
        
        return `
        <h2>${inlägg.text}</h2><hr>
        <h3>${inlägg.bild}</h3><hr>
        <a href="/index/delete/${inlägg._id}"> Delete </a>          
        `               
        })
        
        res.send(render("Ditt flöde",html.join("")))

    } catch (error) {
        console.log(error)
        res.send("error!")
    }
})





app.get("/login",function(req,res){
    res.sendFile(__dirname+"/main.html");
});

app.post("/login",function(req,res){
    res.redirect("/index")
})





app.get("/nytt", async function(req,res){
    res.sendFile(__dirname+"/index.html")
})
app.post("/nytt", async function(req,res){
    try {           
        await app.posts.insertOne(req.body)
        res.redirect("/index")                               
    } catch (error) {            
        res.send("creating error")
    }
}) 

app.get("/index/delete/:id",async function(req,res){
    try {
        let id = req.params.id
        await app.posts.deleteOne({"_id":objectId(id)})
        res.redirect("/index")
    } catch (error) {
        res.send("delete error")
    }
})

app.get("index/edit/:id",async function(req,res){
    
})




}
