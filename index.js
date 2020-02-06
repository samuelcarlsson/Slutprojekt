const express = require('express')

const mongo = require('mongodb').MongoClient
const connectionstring = "mongodb+srv://Samuel:samuel2001@cluster0-fa0m4.mongodb.net/test?retryWrites=true&w=majority"



main();
async function main() {
    const con = await mongo.connect(connectionstring,{ useNewUrlParser: true, useUnifiedTopology: true });

    const db = await con.db("slutprojekt")

    const col = await db.collection("posts") 
    const app = express();
    app.use(express.urlencoded({extended:false}))
    app.posts = col  

  

    app.listen(3456,function(){
        console.log("port = 3456")
    })

    require("./routes")(app)
}


