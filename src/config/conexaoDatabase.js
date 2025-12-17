import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    try {
        await mongoose.connect(uri, { dbName: 'bancoUsuarios' });
        console.log("Conectado ao banco de dados...");
    } catch (err) {
        console.error("Erro de conexão:", err.message);
    }
}

export default connectDB;