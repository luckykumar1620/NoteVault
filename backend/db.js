const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/notevault";

const connectToMongo=async()=>{
   try{
     await mongoose.connect(mongoURI)
        console.log("connected to mongoDB successfullly");
}
   catch(error){
    console.error("not connected to mongodb",error.message);
   }
}

module.exports=  connectToMongo;