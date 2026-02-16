import jwt from "jsonwebtoken";

export default function restringirAcesso(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        // Verifica se o token foi enviado
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Token não fornecido"
            });
        }

        // O formato esperado é: Bearer TOKEN
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token inválido"
            });
        }

        // Verifica se o token é válido
        const decoded = jwt.verify(token, "SEGREDO");

        // Salva os dados do usuário na requisição
        req.usuario = decoded;

        next(); // Permite continuar para a rota

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token inválido ou expirado"
        });
    }
}
