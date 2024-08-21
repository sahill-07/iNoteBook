const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://sahilbangar:Sahil07@cluster0.s8uyggx.mongodb.net/iNotebook' ;

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