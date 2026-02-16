import express from 'express';
import cors from 'cors';
import connectDB from './src/config/conexaoDatabase.js';
import User from './src/models/User.js';

// Login
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Para documentação do swagger
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


// ============================================
// 📝 CRIAR USUÁRIO
// ============================================
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


// ============================================
// 📋 BUSCAR TODOS OS USUÁRIOS
// ============================================
app.get("/usuarios", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).send({ message: "Erro na busca" });
    }
});


// ============================================
// 🔍 BUSCAR USUÁRIO POR ID
// ============================================
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


// ============================================
// ✏️ ATUALIZAR USUÁRIO POR ID
// ============================================
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


// ============================================
// 🗑️ DELETAR USUÁRIO POR ID
// ============================================
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


// ============================================
// 🔑 ROTA DE LOGIN
// ============================================
// ============================================
// 🔑 ROTA DE LOGIN (VERSÃO FINAL CORRIGIDA)
// ============================================
app.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Validação básica
        if (!email || !senha) {
            return res.status(400).json({
                success: false,
                message: "Email e senha são obrigatórios"
            });
        }

        // Buscar usuário com senha (importante: .select('+senha'))
        const user = await User.findOne({
            email: email.toLowerCase().trim()
        }).select('+senha');

        // Usuário não encontrado
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "E-mail ou senha inválidos"
            });
        }

        // Comparar senha usando o método do schema
        const senhaValida = await user.compararSenha(senha);

        // Senha inválida
        if (!senhaValida) {
            return res.status(401).json({
                success: false,
                message: "E-mail ou senha inválidos"
            });
        }

        // Gerar token JWT
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                nome: user.nome
            },
            process.env.JWT_SECRET || "SEGREDO",
            { expiresIn: '1d' }
        );

        // Remover senha do objeto de retorno
        const usuarioSemSenha = user.toObject();
        delete usuarioSemSenha.senha;

        // Sucesso!
        res.status(200).json({
            success: true,
            message: "Login realizado com sucesso!",
            usuario: usuarioSemSenha,
            token
        });

    } catch (e) {
        console.error('❌ Erro no login:', e);
        res.status(500).json({
            success: false,
            message: "Erro interno no servidor"
        });
    }
});


// ============================================
// 🚀 INICIAR SERVIDOR
// ============================================
app.listen(port, () => {
    console.log(`✅ Servidor rodando na porta ${port}`);
    console.log(`📚 Documentação Swagger: http://localhost:${port}/docs`);
    console.log(`👥 Usuários: http://localhost:${port}/usuarios`);
});