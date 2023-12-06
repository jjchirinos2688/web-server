const { Router } = require("express");
const router = Router()
const { inicio, contacto } = require("../controllers/web.controller");


router.get('/inicio.html', inicio )
router.get('/contacto', contacto)


module.exports = router


