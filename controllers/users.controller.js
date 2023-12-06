const { request, response } = require('express');
const { OAuth2Client } = require('google-auth-library');
const { findUserByGoogleSub, createUser, findOneUserById, updateUserGoogleInfo, findUserByEmail } = require('../models/user.model');
const { userModelValidator } = require('../helpers/validators');
const path = require('path')




const index = (req, res = response) => {

    res.json({ msg: 'No has ingresado ningún usuario' })
}



const create = async(req = request, res = response) => {

    try {
        
        // Datos del usuario que llegan en la solicitud
        const usuario = {
            nombre:req.body.nombre,
            email:req.body.email,
            password:req.body.password,
            google:false,
            google_sub: req.body.google_sub,
            role:req.body.role,
            img:null,
            estado:true
        }

        // Verificar si existe usuario
        const existe = await findUserByEmail(usuario.email)
        
        // En caso de que no exista se crea y se recupera el id ingresado
        if(!existe){

            userModelValidator(usuario)    
            
            const insertId = await createUser(usuario)

            console.log("insertId: ", insertId)

            // Recuperamos el usuario ingresado
            const usuarioCreado = await findOneUserById(insertId)
            
            // Devolvemos usuario en la respuesta
            return res.json({usuarioCreado})
        }

        return res.json({msg: 'Usuario ya existe. Comunicarse con el administrador del sistema'})

    } catch (error) {

        // error tiene que ser siempre un error personalizado, para no exponer información confidencial
        console.log('catch error',error)
        res.status(401).json({error})
    }  
}



const getUserByGoogleSub = async(req = request, res= response) => {

    try {

        const sub = req.body.sub
        console.log(sub);

        const usuario = await findUserByGoogleSub(sub)

        if(!usuario){
            return res.status(200).json({msg: 'Usuario no encontrado'})
        }
     
        // Devolver usuario sin el password
        const {password, ...user} = usuario
        return res.status(200).json({user})

    } catch (error) {
        
        res.status(401).json(error)
    }
}



const loginByGoogleRedirect = async(req, res = response) => {

    try {
        // Token que envía el usuario desde la vista
        const  id_token  = req.body.credential

        console.log('Token enviado por google-redirect: ',id_token);
        console.log('Método de selección de la credencial:', req.body.select_by);

        // Verificación del token contra google
        const {email, name, picture, sub} = await verify(id_token)
        console.log('Email:', email);
        console.log('Nombre:', name);
        console.log('Foto:', picture);
        console.log('Sub:', sub);

        // Si el token es válido, buscar el usuario en la BD 
        const existe = await findUserByEmail(email)

        // No exitse el usuario
        if(!existe){
            
            return res.status(401).json({ ok: false, msg: 'Usuario no está registrado en el sistema. Consulte con el administrador.' })
        }

        if(!existe.estado){
            return res.status(401).json({ ok:false, msg: 'EL usuario está deshabilitado. Consulte con el administrador del sistema!'})
        }

        // Actualizar información de google del usuario en la BD
        await updateUserGoogleInfo(email, sub, picture)

        const usuario = await findUserByGoogleSub(sub)

        res.sendFile(path.join(__dirname, "..", "public", "inicio.html"));
        
    } catch (error) {
        
        console.log('Token de acceso no es válido', error)
        res.status(400).json({ok:false, msg: 'Token de acceso no es válido'})
    }
}




// Función utilizada cuando en el index.html se configura el data-callback
const loginByGoogleCallback = async(req, res = response) => {
    
    try {
        // Token que envía el usuario desde la vista
        const { id_token } = req.body

        console.log(id_token);

        // Verificación del token contra google
        const {email, name, picture, sub} = await verify(id_token)

        // Si el token es válido, buscar el usuario en la BD 
        const existe = await findUserByEmail(email)

        // No exitse el usuario
        if(!existe){
            
            return res.status(401).json({ ok: false, msg: 'Usuario no está registrado en el sistema. Consulte con el administrador.' })
        }

        if(!existe.estado){
            return res.status(401).json({ ok:false, msg: 'EL usuario está deshabilitado. Consulte con el administrador del sistema!'})
        }

        // Actualizar información de google del usuario en la BD
        await updateUserGoogleInfo(email, sub, picture)

        const usuario = await findUserByGoogleSub(sub)

        return res.json({ ok:true, msg: 'Token es válido:', usuario })
        
    } catch (error) {
        
        console.log('Token de acceso no es válido', error)
        res.status(400).json({ok:false, msg: 'Token de acceso no es válido'})
    }
}


async function verify(id_token) {

    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
   
    const payload = ticket.getPayload();

    return payload

}


module.exports = {

    index,
    getUserByGoogleSub,
    create,
    loginByGoogleCallback,
    loginByGoogleRedirect
}