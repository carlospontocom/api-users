import express from "express";
import cors from "cors";
import connectDB from "./src/config/conexaoDatabase.js";
import User from "./src/models/User.js";
import Categorias from "./src/models/Categorias.js";
import Post from "./src/models/Posts.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Middlewares de autorização
import permitirPerfis from "./src/middlewares/permitirPerfis.js";   // ✅ corrigido: pasta minúscula
import restringirAcesso from "./src/middlewares/restringirAcesso.js";

const app = express();
const port = 8080;

// Conecta ao banco
connectDB();

// Middlewares globais
app.use(cors());
app.use(express.json());

// ===========================
// ROTAS DE USUÁRIOS
// ===========================

// Criar usuário


app.post("/usuarios", async (req, res) => {
    try {
        const { nome, email, senha, perfilUsuario } = req.body;

        // ✅ SEM bcrypt.hash aqui — o User.create já faz isso
        const usuario = await User.create({ nome, email, senha, perfilUsuario });
        res.status(201).json({ success: true, usuario });
    } catch (e) {
        res.status(500).json({ success: false, erro: e.message });
    }
});




// Listar todos os usuários
app.get("/usuarios", async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({ success: false, erro: e.message });
    }
});

// Buscar usuário por ID
app.get("/usuarios/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({ success: false, erro: e.message });
    }
});

// Atualizar usuário (somente admin)
app.put("/usuarios/:id", restringirAcesso, permitirPerfis("admin"), async (req, res) => {
    try {
        await User.update(req.params.id, req.body);
        const updated = await User.findById(req.params.id);
        res.status(200).json(updated);
    } catch (e) {
        res.status(500).json({ success: false, erro: e.message });
    }
});

// Deletar usuário (somente admin)
app.delete("/usuarios/:id", restringirAcesso, permitirPerfis("admin"), async (req, res) => {
    try {
        await User.delete(req.params.id);
        res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (e) {
        res.status(500).json({ success: false, erro: e.message });
    }
});

// ===========================
// ROTA DE LOGIN
// ===========================

app.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;

        const user = await User.findByEmail(email);
        if (!user) return res.status(401).json({ success: false, message: "E-mail ou senha inválidos" });

        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) return res.status(401).json({ success: false, message: "E-mail ou senha inválidos" });

        // ✅ secret via variável de ambiente
        const token = jwt.sign(
            { id: user.id, email: user.email, perfilUsuario: user.perfilUsuario },
            process.env.JWT_SECRET || "SEGREDO",
            { expiresIn: "1d" }
        );

        // Remove senha do retorno
        const { senha: _, ...usuario } = user;
        res.status(200).json({ success: true, usuario, token });
    } catch (e) {
        res.status(500).json({ success: false, erro: e.message });
    }
});

// ===========================
// ROTAS DE CATEGORIAS
// ===========================

// Criar categoria
app.post("/categorias", async (req, res) => {
    try {
        const { nome } = req.body;
        // ✅ usando o model Categorias, sem db diretamente
        const categoria = await Categorias.create({ nome });
        res.status(201).json(categoria);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// Listar todas as categorias
app.get("/categorias", async (req, res) => {
    try {
        const categorias = await Categorias.findAll();
        res.status(200).json(categorias);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// Buscar categoria por ID
app.get("/categorias/:id", async (req, res) => {
    try {
        // ✅ usando o model Categorias, sem db diretamente
        const categoria = await Categorias.findById(req.params.id);
        if (!categoria) return res.status(404).json({ erro: "Categoria não encontrada" });
        res.status(200).json(categoria);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// Atualizar categoria
app.put("/categorias/:id", async (req, res) => {
    try {
        // ✅ usando o model Categorias, sem db diretamente
        await Categorias.update(req.params.id, req.body);
        res.status(200).json({ mensagem: "Categoria atualizada com sucesso" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// Deletar categoria
app.delete("/categorias/:id", async (req, res) => {
    try {
        // ✅ usando o model Categorias, sem db diretamente
        await Categorias.delete(req.params.id);
        res.status(200).json({ mensagem: "Categoria deletada com sucesso" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// ===========================
// ROTAS DE POSTS
// ===========================

// Criar post (autenticado)
app.post("/posts", restringirAcesso, async (req, res) => {
    try {
        const { titulo, descricao, imagem, categorias } = req.body;
        const autor_id = req.usuario.id; // vem do token via restringirAcesso

        const post = await Post.create({ titulo, descricao, imagem, autor_id, categorias });
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// Listar todos os posts
app.get("/posts", async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// Buscar post por ID
app.get("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ erro: "Post não encontrado" });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// Atualizar post (autenticado) ✅ adicionado restringirAcesso
app.put("/posts/:id", restringirAcesso, async (req, res) => {
    try {
        await Post.update(req.params.id, req.body);
        res.status(200).json({ mensagem: "Post atualizado com sucesso" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// Deletar post (autenticado) ✅ adicionado restringirAcesso
app.delete("/posts/:id", restringirAcesso, async (req, res) => {
    try {
        await Post.delete(req.params.id);
        res.status(200).json({ mensagem: "Post deletado com sucesso" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// ===========================
// INICIA SERVIDOR
// ===========================

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});