import express from "express";
import { config } from "dotenv";
import User from "./models/User";

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


//buscando todos
app.get("/usuarios", async (req, res) => {
    try {
        const users = await User.find().select("-senha");
        res.status(200).send(users)
    } catch (error) {
        console.log("Erro na busca de dados", error.message)
        res.status(500).send("Erro na tentativa de busca...")
    }
})


//buscando por id
app.get("/usuarios/:id", async (req, res) => {
    try {
        const searchId = req.params.id

        const user = await User.findById(searchId).select("-senha");

        if (!user) {
            return res.status(404).send("Usuário não existe")
        }

        res.status(200).send(user)

    } catch (error) {
        console.log("Erro na busca de dados por id", error.message)
        res.status(500).send("Erro na tentativa de busca por id")
    }
})


app.post("/usuarios", async (req, res) => {
    try {
        const novoUsuario = await User.create(req.body)
        res.status(201).send(novoUsuario)

    } catch (error) {
        console.log("Erro na tentativa de criar", error.message)
        res.status(500).send("Erro na tentativa de criar")
    }
})


app.put("/usuarios/:id", async (req, res) => {
    try {
        const searchId = req.params.id
        const alterado = await User.findByIdAndUpdate(searchId, req.body, { new: true })

        if (!alterado) {
            return res.status(404).send("Usuario não encontrado para alteração")
        }
        res.status(201).send(alterado)

    } catch (error) {
        console.log("Erro na tentativa de criar", error.message)
        res.status(500).send("Erro na tentativa de atualizar")
    }
})


app.delete("/usuarios/:id", async (req, res) => {
    try {
        const searchId = req.params.id;

        const excluido = await User.findByIdAndDelete(searchId);

        if (!excluido) {
            return res.status(404).send("Usuário não encontrado para exclusão");
        }

        res.status(200).send("Usuário removido com sucesso!");

    } catch (error) {
        console.log("Erro ao excluir:", error.message);
        res.status(500).send("Erro na tentativa de excluir");
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});


