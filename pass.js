const bcrypt = require("bcryptjs")

bcrypt.hash("123",9,function(err,hash){
    console.log(hash)
})