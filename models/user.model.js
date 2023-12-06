const connection = require('../db/db.config')

const usuarios = [

    { nombre: 'Julio Tepille', email: 'julio.chirinos@tepille.cl', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKyZnjcwQtKCh_Nq76RCPSX0X2TZngyVcGXe1V7TyHHLQ=s96-c' },
    { nombre: 'Julio Chirinos', email: 'juliochirinosacurero@gmail.com', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKyZnjcwQtKCh_Nq76RCPSX0X2TZngyVcGXe1V7TyHHLQ=s96-c' },

]


const createUser = (user) => {

    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO usuarios SET ?`, user, (err, result) => {
            if (err) {

                // Imprimir sólo para uso interno de seguimiento de errores. No exponer al público
                console.log('createUser error')
                console.log('Mensaje: ', err.sqlMessage)

                // Retornar un mensaje de error personalizado
                return reject('Ocurrió un error. Comuniquese con el administrador del sistema!')
            }

            console.log('Mensaje antes del resolve')
            return resolve(result.insertId)
        })
    })
}


const findOneUserById = (id) => {

    querySring = `SELECT nombre,email, google, role, img, estado FROM usuarios WHERE id = '${id}'`
    return new Promise((resolve, reject) => {

        connection.query(querySring, (error, result) => {

            if (error) {
                console.log('findOneUserById error')
                console.log('Mensaje: ', error.sqlMessage)
                return reject('Ocurrió un error al intentar recuperar el  usuario. Contate al administrador del sistema!')
            }
            console.log(result)
            return resolve(result[0])
        })
    })
}

const findUserByGoogleSub = (sub) => {

    querySring = `SELECT nombre,email, google, google_sub, role, img, estado FROM usuarios WHERE google_sub = '${sub}'`
    return new Promise((resolve, reject) => {

        connection.query(querySring, (error, result) => {

            if (error) {
                console.log('findOneUserBySub error')
                console.log('Mensaje: ', error.sqlMessage)
                return reject('Ocurrió un error de verificación de usuario. Contate al administrador del sistema!')
            }

            console.log(result)
            return resolve(result[0])
        })
    })
}

const findUserByEmail = (email) => {

    querySring = `SELECT nombre,email, google, google_sub, role, img, estado FROM usuarios WHERE email = '${email}'`
    return new Promise((resolve, reject) => {

        connection.query(querySring, (error, result) => {

            if (error) {
                console.log('findUserByEmail error')
                console.log('Mensaje: ', error.sqlMessage)
                return reject('Ocurrió un error de verificación de usuario. Contate al administrador del sistema!')
            }

            console.log(result)
            return resolve(result[0])
        })
    })
}


const updateUserGoogleInfo = (email, sub, picture) =>{

    return new Promise((resolve, reject) => {
        connection.query(`UPDATE usuarios SET google_sub= '${sub}', img= '${picture}' WHERE email = '${email}'`, (error, result) => {
            if(error) {

                console.log('updateUserGoogleInfo error')
                console.log(error);
                return reject('Ocurrió un error al actualizar el usuario. Contacte al administrador del sistema!')
            }

            return resolve(result)
        })
    })
}


module.exports = {
    findOneUserById,
    findUserByEmail,
    findUserByGoogleSub,
    createUser,
    updateUserGoogleInfo
}