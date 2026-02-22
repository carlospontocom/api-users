export default function permitirPerfis(...perfisPermitidos) {
    return (req, res, next) => {
        const usuario = req.usuario;

        if (!usuario) {
            return res.status(401).json({ success: false, message: "Usuário não autenticado" });
        }

        if (!perfisPermitidos.includes(usuario.perfilUsuario)) {
            return res.status(403).json({ success: false, message: "Acesso negado para seu perfil" });
        }

        next();
    };
}
