require("dotenv").config()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then( ()=>console.log('Got a db!') )
    .catch( err=>console.log("Beep! Bad db! " + err) )

// const mongoose = require('mongoose')

// mongoose.connect('mongodb://127.0.0.1/vifile',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then( ()=>console.log('Got a db!') )
//     .catch( err=>console.log("Beep! Bad db! " + err) )