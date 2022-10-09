const mongoose = require("mongoose");
require("dotenv").config()
const URL = process.env.URL;


function initializeDBConnection() {
  // Connecting to DB
  try{
      mongoose.connect(URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      console.log("successfully connected")
  }catch(err){
      console.error("mongoose connection failed...", err)
  };
    
};

module.exports = { initializeDBConnection }