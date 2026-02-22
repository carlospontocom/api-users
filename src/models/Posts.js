import { db } from "../config/conexaoDatabase.js";

const Post = {
    async create({ titulo, descricao, imagem, autor_id, categorias }) {
        const [result] = await db.query(
            "INSERT INTO posts (titulo, descricao, imagem, autor_id, categorias) VALUES (?, ?, ?, ?, ?)",
            [titulo, descricao, imagem, autor_id, categorias]
        );

        return {
            id: result.insertId,
            titulo,
            descricao,
            imagem,
            autor_id,
            categorias
        };
    },

    // READ - buscar todos os posts
    async findAll() {
        const [rows] = await db.query(
            "SELECT id, titulo, descricao, imagem, criado_em, autor_id FROM posts"
        );
        return rows;
    },

    // READ - buscar post por ID
    async findById(id) {
        const [rows] = await db.query(
            "SELECT id, titulo, descricao, imagem, criado_em, autor_id FROM posts WHERE id = ?",
            [id]
        );
        return rows[0];
    },

    // UPDATE - atualizar post
    async update(id, { titulo, descricao, imagem }) {
        const updates = [];
        const values = [];

        if (titulo) {
            updates.push("titulo = ?");
            values.push(titulo);
        }
        if (descricao) {
            updates.push("descricao = ?");
            values.push(descricao);
        }
        if (imagem) {
            updates.push("imagem = ?");
            values.push(imagem);
        }

        if (updates.length === 0) return;

        values.push(id);

        await db.query(`UPDATE posts SET ${updates.join(", ")} WHERE id = ?`, values);
    },

    // DELETE - remover post
    async delete(id) {
        await db.query("DELETE FROM posts WHERE id = ?", [id]);
    }
};

export default Post;
