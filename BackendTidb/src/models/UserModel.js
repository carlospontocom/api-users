import db from '../config/database.js';

class UsuarioModel {
    static async buscarTodos() {
        try {
            const query = "SELECT * FROM usuarios";
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async adicionar(nome, email, senha) {
        try {
            const query = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
            const [result] = await db.execute(query, [nome, email, senha]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async deletar(id) {
        try {
            const query = "DELETE FROM usuarios WHERE id = ?";
            const [result] = await db.execute(query, [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async atualizar(id, nome, email) {
        try {
            const query = "UPDATE usuarios SET nome = ?, email = ? WHERE id = ?";
            const [result] = await db.execute(query, [nome, email, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

export default UsuarioModel;