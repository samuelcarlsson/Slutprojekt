
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
        <a href="/index/edit/${inlägg._id}"> Edit </a> 
        
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
        <input type="file" accept="image/*" name="picture" value = "${inlägg.bild}" placeholder="picture">
        <br>
        <input type="hidden" name="id" value="${id}">
        <input type="submit" value="save post">
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


}
