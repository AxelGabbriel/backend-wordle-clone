const express= require('express')
const router = express.Router()
const usuario = require('../controllers/usuario')

const passport=require('passport')
const { passportAuth } = require('../middlewares')

//rutas usuario
router.put( '/modificar/:id',usuario.modificar)
router.get('/buscar-usuario/:id_usuario',usuario.buscarid)
router.get('/buscar-nombre/:nombre',usuario.buscarnombreusuario)

//registro y login
router.post('/registro',usuario.register)
router.post('/login', passportAuth)

router.get('/perfil',(req,res)=>{
    res.send('perfil')
})
router.get('/verificacion',(req,res)=>{
    res.send('verificacion')
})
module.exports = router