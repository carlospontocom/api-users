import jwt from "jsonwebtoken";

export default function restringirAcesso(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Token não fornecido"
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token inválido"
            });
        }

        const decoded = jwt.verify(token, "SEGREDO");

        req.usuario = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token inválido ou expirado"
        });
    }
}
