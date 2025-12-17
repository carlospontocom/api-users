import mongoose, { mongo } from "mongoose";

import { Schema } from "mongoose";

const userSchema = new Schema({
    nome: {
        type: String,
        required: true,
        minlength: [6, 'Nome do usuário deve ser de 6 ou mais caracteres!'],
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true,
        minlength: [6, 'A senha deve ser de 6 ou mais caracteres!'],
        select: false
    }
});

const User = mongoose.model('User', userSchema)

export default User;