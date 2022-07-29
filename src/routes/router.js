const express= require('express')
const router = express.Router()
const usuario = require('../controllers/usuario')

const passport=require('passport')
const { passportAuth } = require('../middlewares')

//rutas usuario
router.put( '/modificar-usuario',usuario.modificar)
router.get('/buscar-usuario/:id_usuario',usuario.buscarid)
router.get('/buscar-nombre/:nombre',usuario.buscarnombreusuario)

//registro y login
router.post('/registro',usuario.register)
router.post('/login', passportAuth)
router.get('/perfil',(req,res)=>{
    res.send('perfil')
})
//verificacion
router.post('/verificacion',usuario.verificar)

//rutas room
router.post('/crear-room',)
router.put('/modificar-room',)
router.get('/buscar-room',)
router.get('/rooms',)
router.delete('/borrar-sala',)

//rutas puntaje
router.get('/buscar-puntaje/:id_usuario',)
router.post('/crear-puntaje',)





module.exports = router