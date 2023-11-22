const { Router } = require("express");

const { index, saveUser, getUser, welcomeUser } = require("../controllers/users.controller");


const router = Router()

router.get('/', index )

router.get('/bienvenido',welcomeUser )


router.get('/:id', getUser)


//El usuario ya seleccionó una cuenta de google para iniciar sesión y el calback que escucha esa selección envía esta solicitud
// para validar el id_token contra google y recuperar la información del usuario
router.post('/google-login', saveUser)









module.exports = router