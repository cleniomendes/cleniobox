const User = require('../models/User');

class AuthController {
    async register (req, res) {
        const { email } = req.body;
        try {
            if(await User.findOne({ email }))
                return res.status(400).send({error: "Usuário já existe!"});

            const user = await User.create(req.body);
            user.password = undefined;
            return res.send({user});
        } catch (err) {            
            res.status(400).send({error: "Erro ao criar usuario"});
        }
    }
}

module.exports = new AuthController();