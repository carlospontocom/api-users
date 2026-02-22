import { db } from "../config/conexaoDatabase.js";

const Categorias = {
    // Criar categoria
    async create({ nome }) {
        const [result] = await db.query(
            "INSERT INTO categorias (nome) VALUES (?)",
            [nome]
        );
        return { id: result.insertId, nome };
    },

    // Buscar todas as categorias
    async findAll() {
        const [rows] = await db.query("SELECT id, nome, criado_em FROM categorias");
        return rows;
    },

    // Buscar categoria por ID
    async findById(id) {
        const [rows] = await db.query(
            "SELECT id, nome, criado_em FROM categorias WHERE id = ?",
            [id]
        );
        return rows[0];
    },

    // Buscar categoria por nome
    async findByNome(nome) {
        const [rows] = await db.query(
            "SELECT * FROM categorias WHERE nome = ?",
            [nome.toLowerCase().trim()]
        );
        return rows[0];
    },

    // Atualizar categoria
    async update(id, { nome }) {
        const updates = [];
        const values = [];

        if (nome) {
            updates.push("nome = ?");
            values.push(nome);
        }

        if (updates.length === 0) return;

        values.push(id);

        await db.query(`UPDATE categorias SET ${updates.join(", ")} WHERE id = ?`, values);
    },

    // Deletar categoria
    async delete(id) {
        await db.query("DELETE FROM categorias WHERE id = ?", [id]);
    }
};

export default Categorias;
