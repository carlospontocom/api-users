import mysql from "mysql2/promise";

let db;

const connectDB = async () => {
    try {
        db = await mysql.createPool({
            host: "localhost",
            user: "root",
            password: "",
            database: "bancoDadosBlog",
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        console.log("Conectado ao MySQL!");
    } catch (error) {
        console.error("Erro ao conectar ao MySQL:", error);
    }
};

export { db };
export default connectDB;
