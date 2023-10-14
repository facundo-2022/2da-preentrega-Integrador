const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = 'CoderKey';

const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10)); // toma el password y aplica el proceso de hasheo , el gensalt]Sinc te crea 10 caracteres distinto a la clave
const isValidatePassword = (user, password) =>
  bcrypt.compareSync(password, user.password); // esta user y password y los compara, internamente decifra para comparar y si coinciden las vuelve a cifrar.

module.exports = {
  createHash,
  isValidatePassword,
};


//generacion del token donde podemos delegar al front de los inicio de session del usuario
const generateToken = (user) => {
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn: "24h"})
    return token
}

//autenticacion del token
const authToken = (req, res, next) => {
    const autHeader = req.headers.authorization
    if(!autHeader) return res.status(104).send({erro: "No autenticado"})

    const token = autHeader.split(" ")[1]
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if(error) return res.status(403).send({error: "No autorizado"})
        req.user = credentials.user
        next()
    })
}

//lo exportamos para poder utilizar el codigo desde nuestra app

module.exports = ({
    generateToken,
    authToken,
})