const bd = require('../database')



const room = {}

room.crear=(req,res)=>{
    try {bd.crearroom(req,res)} catch (e) {
        console.log(e)
    }

}

room.modificar=(req,res)=>{
    try {bd.modificarsala(req,res)} catch (e) {
        console.log(e) 
    }
}

room.buscaridroom=(req,res)=>{
    try {
        bd.buscarroom=(req,res)
    } catch (e) {
        console.log(e)
    }
}

room.leerroom=(req,res)=>{
try {
    bd.leerroom(req,res)
} catch (e) {
    console.log(e)
}

}

room.borrarsala=(req,res)=>{
    try {
        bd.borrarsala(req,res)
    } catch (e) {
        console.log(e)
    }
}






module.exports= room