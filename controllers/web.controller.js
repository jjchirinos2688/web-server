const { request, response } = require("express");


const inicio = (req, res) => {
    res.sendFile('web/inicio.html');
}

const contacto = (req,res) => {
    res.sendFile('contacto.html');
}




module.exports = {
    inicio, contacto
}