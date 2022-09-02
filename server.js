const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')


dotenv.config()

const app = express()


mongoose.connect(process.env.DATABASE,
  {useNewUrlParser:true,useUnifiedTopology:true},
  err=>{
    if(err){
      console.log(err)  
    } else{
      console.log("Connected to the MongoDB")  
    }
})


//Middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


// require apis
const hostRoutes = require("./routes/host");
const userRoutes = require("./routes/auth");


app.use("/api", hostRoutes);
app.use("/api", userRoutes);



app.listen(3000,err=>{
    if(err){
      console.log(err)
    } else{
      console.log("Listening on PORT 3000")  
    }  
  })