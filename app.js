const express = require('express')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT

app.use(express.static('public'))

app.get('/hola-mundo', (req, res) => {
  console.log('Ha entrado una nueva solicitud')
  res.send('Hello World')
})

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/404.html')
})

app.listen(PORT, () => {
    console.log(`La aplicación está corriendo en el puerto ${PORT}`);
})