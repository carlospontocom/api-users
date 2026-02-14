import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    nome: {
        type: String,
        required: true,
        minlength: [6, 'Nome do usuário deve ter 6 ou mais caracteres!'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor, insira um email válido!']
    },
    senha: {
        type: String,
        required: true,
        minlength: [6, 'A senha deve ter 6 ou mais caracteres!']
    }
    //,
    // cpf: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     match: [/^\d{11}$/, 'O CPF deve conter exatamente 11 dígitos numéricos!']
    // },
    // cep: {
    //     type: String,
    //     required: true,
    // },
    // logradouro: {
    //     type: String,
    //     required: true,
    // },
    // bairro: {
    //     type: String,
    //     required: true,
    // },
    // cidade: {
    //     type: String,
    //     required: true,
    // },
    // uf: {
    //     type: String,
    //     required: true,
    // },
    // complemento: {
    //     type: String,
    // }
});

const User = mongoose.model('User', userSchema);

export default User;
