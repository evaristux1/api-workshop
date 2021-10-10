const usuarios = require("../controllers/usuarios");

async function middlewareToken(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) return res.status(401).send({status: false, erro: "Nenhum token informado"});
        
        const verificacao = await usuarios.verificar(token);
        
        if (verificacao) {
            await next();
        } else {
            res.send({status: false, desconectar: true, erro: "Falha ao se autenticar"});
        }
    } catch (err) {
        res.status(500).send({status: false, erro: err})
    }
}

module.exports = middlewareToken;