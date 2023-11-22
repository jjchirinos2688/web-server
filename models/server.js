require('dotenv').config()
const express = require('express')
 
 class Server {

    constructor(){

        this.app = express()
        this.port = process.env.PORT

        // Midlewares
        this.midlewares()

        // Rutas de mi app
        this.routes()
    }

    midlewares(){

        this.app.use(express.static('public'))

        // Parseo del body request
        this.app.use(express.json());
    }

    routes(){

        this.app.use('/api/usuarios', require('../routes/users.routes'))

    }

    listener(){
        this.app.listen(this.port, () => {
            console.log(`La aplicación está corriendo en el puerto ${this.port}`);
        })
    }

 }

 module.exports = Server