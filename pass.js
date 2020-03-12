const bcrypt = require("bcryptjs")

bcrypt.hash("tomten",9,function(err,hash){
    console.log(hash)
})