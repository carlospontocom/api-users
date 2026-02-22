import express from 'express';
import cors from 'cors';
import UsuarioModel from './src/models/UserModel.js';

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

//----rotas---- 
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await UsuarioModel.buscarTodos();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Rota para adicionar novo usuário
app.post('/usuarios', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const id = await UsuarioModel.adicionar(nome, email, senha);
        res.status(201).json({ id, nome, email });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Rota para atualizar usuário existente
app.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email } = req.body;
        const sucesso = await UsuarioModel.atualizar(id, nome, email);

        if (sucesso) {
            res.status(200).json({ mensagem: "Usuário atualizado com sucesso" });
        } else {
            res.status(404).json({ erro: "Usuário não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Rota para deletar usuário
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sucesso = await UsuarioModel.deletar(id);

        if (sucesso) {
            res.status(200).json({ mensagem: "Usuário removido com sucesso" });
        } else {
            res.status(404).json({ erro: "Usuário não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
