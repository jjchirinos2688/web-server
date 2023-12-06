require('dotenv').config()
const express = require('express')
const path = require('path');
const { loginByGoogleRedirect } = require('../controllers/users.controller');


class Server {

    constructor() {

        this.app = express()
        this.port = process.env.PORT

        // Midlewares
        this.midlewares()

        // Rutas de mi app
        this.routes()
    }

    midlewares() {

        // Parseo del body request
        this.app.use(express.json())
        this.app.use(express.urlencoded())

        // Establece el prefijo web-server como punto de entrada a la carpeta public. Por defecto toma index.html
        this.app.use('/', express.static(path.join(__dirname, '../public')));
    }

    routes() {
        

        this.app.post('/inicio', loginByGoogleRedirect);

        // Rutas para servir la parte web
        this.app.use('/', require('../routes/web.routes'))

        // Rutas para servir la parte de la api
        this.app.use('/api/usuarios', require('../routes/users.routes'))

        // Ruta para renderizar cuando no coincide con ningún endpoint
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, "..", "public", "404.html"))
        })
    }

    listener() {
        this.app.listen(this.port, () => {
            console.log(`La aplicación está corriendo en el puerto ${this.port}`);
        })
    }

}

module.exports = Server