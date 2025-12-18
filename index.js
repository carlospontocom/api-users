import express from 'express';
import cors from 'cors';
import connectDB from './src/config/conexaoDatabase.js';
import User from './src/models/User.js';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger.json');

// 1. PRIMEIRO VOCÊ CRIA O APP
const app = express();

// 2. DEPOIS VOCÊ USA O APP (Middlewares e Documentação)
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = 8080;
connectDB();


//CRIANDO NOVO USER
app.post("/usuarios", async (req, res) => {
    try {
        const novoUsuario = await User.create(req.body);
        res.status(201).json(novoUsuario)
    } catch (error) {
        res.status(500).json({ message: "Erro interno no cadastro do novo usuário" })
    }
})


//BUSCANDO POR TODOS
app.get("/usuarios", async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(404).send({ message: "Erro na busca" })
    }
})


//BUSCANDO POR ID
app.get("/usuarios/:id", async (req, res) => {
    try {
        const searchId = req.params.id;

        const user = await User.findById(searchId).select('-senha');

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" })
        }

        res.status(200).json(user)

    } catch (error) {
        res.status(500).send({ message: "Erro interno na busca por ID" })
    }
})


//ATUALIZAR POR ID
app.put("/usuarios/:id", async (req, res) => {
    try {
        const searchId = req.params.id;
        const updated = await User.findByIdAndUpdate(searchId, req.body, { new: true });

        if (!updated) {
            return res.status(404).json({ message: "Usuário não atualizado" })
        }

        res.status(200).json(updated)

    } catch (error) {
        res.status(500).send({ message: "Erro interno na atualização" })
    }
})



//DELETAR POR ID
app.delete("/usuarios/:id", async (req, res) => {
    try {
        const searchId = req.params.id;

        const deleted = await User.findByIdAndDelete(searchId)

        if (!deleted) {
            return res.status(404).json({ message: "Usuário não deletado" })
        }

        res.status(200).json(deleted)

    } catch (error) {
        res.status(500).send({ message: "Erro interno no momento do deletar" })
    }
})


app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`) })