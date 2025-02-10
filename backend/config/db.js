const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/xyz2db',{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('Mongodb connected');
    }catch(error){
        console.error('MongoDB connection error : ',error);
        ProcessingInstruction.exit(1);
    }
};