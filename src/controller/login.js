import { usuariosDao } from "../daos/index.js"
import { isValidPassword } from '../utils/crypt.js'

export const postLoginController = async (req, res, next) => {
    const usuarios = await usuariosDao.listarAll() //Ubicamos a todos los usuarios 
    const user = usuarios.find(usuario => usuario.email === req.body.username) //buscamos al usuario que esta haciendo el login

    if (!user) {
        req.session.message = 'Usuario no encontrado'
    } else {
        if (!isValidPassword(req.body.password, user.password)) {
            req.session.message = 'Password incorrecto'
        }
    }

    req.session.route = 'login'
    next();
}

export const getLoginController = (req, res) => {
    res.render('pages/login')
}