import mongoose from 'mongoose'

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected !!enjoy ankit");
        
    } catch (error) {
        console.log("DataBase not connected !!");
        
    }
}

export default connectDB;