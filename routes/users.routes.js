const { Router } = require("express");

const { index, loginByGoogleCallback, getUserByGoogleSub, create } = require("../controllers/users.controller");

const router = Router()

router.get('/', index )

router.post('/userinfo', getUserByGoogleSub)

router.post('/create',create )


//El usuario ya seleccionó una cuenta de google para iniciar sesión y el callback que escucha esa selección envía esta solicitud
// para validar el id_token contra google y recuperar la información del usuario
router.post('/google-login', loginByGoogleCallback)






module.exports = router