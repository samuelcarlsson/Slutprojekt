const express = require('express')
const upload = require('express-fileupload')
const mongo = require('mongodb').MongoClient
const connectionstring = "mongodb+srv://Samuel:samuel2001@cluster0-fa0m4.mongodb.net/test?retryWrites=true&w=majority"
const cookieParser = require('cookie-parser')




main();
async function main() {
    const con = await mongo.connect(connectionstring,{ useNewUrlParser: true, useUnifiedTopology: true });

    const db = await con.db("slutprojekt")

    const col = await db.collection("posts") 
    const app = express();
    app.use(upload());
    app.use(express.static(__dirname+"/images"))
    app.posts = col  
    app.use(express.urlencoded())
    app.use(cookieParser())

    app.listen(3456,function(){
        console.log("port = 3456")
    })

    require("./routes")(app)
}


