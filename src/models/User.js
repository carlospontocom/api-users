import { db } from "../config/conexaoDatabase.js";
import bcrypt from "bcryptjs";

const User = {
    // criar usuário
    async create({ nome, email, senha, perfilUsuario }) {
        // ✅ hash feito aqui no model — NÃO fazer hash novamente no server.js
        const hashedSenha = await bcrypt.hash(senha, 10);
        const [result] = await db.query(
            "INSERT INTO usuarios (nome, email, senha, perfilUsuario) VALUES (?, ?, ?, ?)",
            [nome, email.toLowerCase().trim(), hashedSenha, perfilUsuario || "user"]
        );
        return { id: result.insertId, nome, email, perfilUsuario };
    },

    // buscar todos (sem expor senha)
    async findAll() {
        const [rows] = await db.query(
            "SELECT id, nome, email, perfilUsuario, criado_em FROM usuarios"
        );
        return rows;
    },

    // buscar por ID (sem expor senha)
    async findById(id) {
        const [rows] = await db.query(
            "SELECT id, nome, email, perfilUsuario, criado_em FROM usuarios WHERE id = ?",
            [id]
        );
        return rows[0] || null; // ✅ retorna null explicitamente se não encontrar
    },

    // buscar por email — inclui senha para validação no login
    async findByEmail(email) {
        const [rows] = await db.query(
            "SELECT * FROM usuarios WHERE email = ?",
            [email.toLowerCase().trim()]
        );
        return rows[0] || null; // ✅ retorna null explicitamente se não encontrar
    },

    // atualizar
    async update(id, { nome, email, senha }) {
        const updates = [];
        const values = [];

        if (nome) {
            updates.push("nome = ?");
            values.push(nome);
        }

        if (email) {
            updates.push("email = ?");
            values.push(email.toLowerCase().trim());
        }

        if (senha) {
            const hashed = await bcrypt.hash(senha, 10);
            updates.push("senha = ?");
            values.push(hashed);
        }

        if (updates.length === 0) return; // nada para atualizar

        values.push(id);
        await db.query(`UPDATE usuarios SET ${updates.join(", ")} WHERE id = ?`, values);
    },

    // deletar
    async delete(id) {
        await db.query("DELETE FROM usuarios WHERE id = ?", [id]);
    }
};

export default User;