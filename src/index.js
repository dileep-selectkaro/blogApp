const express = require("express");
const app=express();
const mongoose=require("mongoose");
const route=require('./routes/route')
const dotenv=require("dotenv");
dotenv.config();

let PORT=process.env.PORT;


app.use(express.json())

mongoose.connect(process.env.DB_URL)
.then(()=>{
  console.log("MongoDb is connected")
})
.catch((error)=>{
  console.log(error);
})

app.use('/',route)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});