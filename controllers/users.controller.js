const { request, response } = require('express');
const { OAuth2Client } = require('google-auth-library');
const { findOneUser } = require('../models/userModel');



const index = (req, res = response) => {

    res.json({ msg: 'Hola Mundo desde el controlador' })
}


const getUser = (req = request, res) => {

    const idUsuario = req.params.id

    res.json({ msg: `Usuario ${idUsuario}` })
}


const welcomeUser = (req, res) => {

    res.json({ msg: 'página de bienvenida del usuario' })
}


const saveUser = async(req, res = response) => {
    
    try {
        // Token que envía el usuario desde la vista
        const { id_token } = req.body
    
        // Verificación del token contra google
        const {email, name, picture} =   await verify(id_token)
        
        // Si el token es válido, buscar el usuario en la BD 
        const usuario = findOneUser(email)

        // No eixtse el usuario
        if(!usuario){
            
            return res.status(401).json({ msg: 'Usuario no está registrado en el sistema. Consulte con el administrador.' })
        }

        res.json({ msg: 'Token es válido:', usuario })
        
    } catch (error) {
        
        console.log('Token de acceso no es válido', error)
        res.status(400).json({msg: 'Token de acceso no es válido'})
    }
}


async function verify(id_token) {

    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: '695911249328-9sjjsmkunud5q84gelfujd7mepoc3l4d.apps.googleusercontent.com',
    });
   
    const payload = ticket.getPayload();

    return payload

}


module.exports = {

    index,
    getUser,
    welcomeUser,
    saveUser
}