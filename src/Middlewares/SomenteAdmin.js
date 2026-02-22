function somenteAdmin(req, res, next) {

    if (req.user.perfilUsuario !== "admin") {
        return res.status(403).json({
            message: "Apenas administradores podem realizar esta ação"
        });
    }

    next();
}
export default somenteAdmin;