import db from '../config/database.js';
import bcrypt from 'bcrypt';

class UsuarioModel {
    static async buscarTodos() {
        try {
            const query = "SELECT id,nome,email FROM usuarios";
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async adicionar(nome, email, senha) {
        try {

            const salt = 10;
            const senhaHash = await bcrypt.hash(senha, salt);

            const query = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
            const [result] = await db.execute(query, [nome, email, senhaHash]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // static async login(email, senhaDigitada) {
    //     const [rows] = await db.query(
    //         "SELECT * FROM usuarios WHERE email=?", [email]
    //     );
    //     if (rows.length > 0) {
    //         return await bcrypt.compare(senhaDigitada, rows[0].senha);
    //     }
    //     return false;
    // }

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