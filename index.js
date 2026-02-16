import express from 'express';
import cors from 'cors';
import connectDB from './src/config/conexaoDatabase.js';
import User from './src/models/User.js';

// Login
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Para documentação do swagger
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';

//Para rota privativa - usuário logado
import restringirAcesso from './src/Middlewares/MiddlewareAuth.js';

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

        // Busca o usuário
        const user = await User.findById(searchId);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        // Atualiza campos permitidos
        user.nome = req.body.nome ?? user.nome;
        user.email = req.body.email ? req.body.email.toLowerCase().trim() : user.email;

        // Se vier senha, atualiza
        if (req.body.senha && req.body.senha.trim() !== '') {
            user.senha = req.body.senha; // o hash será aplicado no pre-save
        }

        await user.save(); // dispara o pre-save para senha

        const { senha: _, ...usuario } = user.toObject();
        res.status(200).json(usuario);

    } catch (error) {
        res.status(500).json({ message: "Erro interno na atualização", erro: error.message });
    }
});


// DELETAR POR ID
app.delete("/usuarios/:id", restringirAcesso, async (req, res) => {
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




// Rota de LOGIN
app.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return res.status(401).json({ success: false, message: "E-mail ou senha inválidos" });
        }

        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) {
            return res.status(401).json({ success: false, message: "E-mail ou senha inválidos" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            "SEGREDO",
            { expiresIn: '1d' }
        );

        const { senha: _, ...usuario } = user.toObject();
        res.status(200).json({
            success: true,
            usuario,
            token
        });

    } catch (e) {
        res.status(500).json({ success: false, erro: e.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});