import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('MongoDB database connected successfully'));
        await mongoose.connect(`${process.env.MONGODB_URI}/tour-packages`) 
    }catch (error) {
        console.log(error.message);
    }
}

export default connectDB;