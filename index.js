import express from 'express';
import cors from 'cors';
import connectDB from './src/config/conexaoDatabase.js';
import User from './src/models/User.js';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(cors());
app.use(express.json());

// Swagger com arquivo externo
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = 8080;
connectDB();


// CRIAR USUÁRIO
app.post("/usuarios", async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        const user = new User({
            nome: nome?.trim(),
            email: email?.toLowerCase().trim(),
            senha
        });

        await user.save(); // dispara o pre("save") e aplica o hash

        const { senha: _, ...usuario } = user.toObject();
        res.status(201).json({ success: true, usuario });
    } catch (e) {
        res.status(e.name === 'ValidationError' ? 400 : 500).json({
            success: false,
            erro: e.message
        });
    }
});


// BUSCAR TODOS
app.get("/usuarios", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).send({ message: "Erro na busca" });
    }
});

// BUSCAR POR ID
app.get("/usuarios/:id", async (req, res) => {
    try {
        const searchId = req.params.id;
        const user = await User.findById(searchId).select('-senha');

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({ message: "Erro interno na busca por ID" });
    }
});

// ATUALIZAR POR ID
app.put("/usuarios/:id", async (req, res) => {
    try {
        const searchId = req.params.id;
        const updated = await User.findByIdAndUpdate(searchId, req.body, { new: true });

        if (!updated) {
            return res.status(404).json({ message: "Usuário não atualizado" });
        }

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).send({ message: "Erro interno na atualização" });
    }
});

// DELETAR POR ID
app.delete("/usuarios/:id", async (req, res) => {
    try {
        const searchId = req.params.id;
        const deleted = await User.findByIdAndDelete(searchId);

        if (!deleted) {
            return res.status(404).json({ message: "Usuário não deletado" });
        }

        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).send({ message: "Erro interno no momento do deletar" });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});