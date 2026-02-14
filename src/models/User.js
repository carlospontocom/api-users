import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema({
    nome: {
        type: String,
        required: true,
        minlength: [6, 'Nome do usuário deve ter 6 ou mais caracteres!'],
        trim: true
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor, insira um email válido!'],
        lowercase: true,
        unique: true
    },
    senha: {
        type: String,
        required: true,
        minlength: [6, 'A senha deve ter 6 ou mais caracteres!']
    }
}, {
    timestamps: true
});

// Middleware para hash da senha
userSchema.pre("save", async function () {
    if (!this.isModified("senha")) {
        return; // se não alterou a senha, não faz nada
    }
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
});

// Método para comparar senha
userSchema.methods.compararSenha = async function (senhaDigitada) {
    return await bcrypt.compare(senhaDigitada, this.senha);
};

const User = mongoose.model("User", userSchema);

export default User;