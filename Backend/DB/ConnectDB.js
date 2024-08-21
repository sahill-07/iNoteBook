const mongoose = require('mongoose');
const mongoURL = '' ;

const connectToMongo = async () => {
    try{
        await mongoose.connect(mongoURL)
        console.log("MongoDB Connected!!")
    }
    catch(err){
        console.log("Error :" , err);
    }
}

module.exports = connectToMongo;