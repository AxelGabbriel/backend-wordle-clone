const db=require('../database')
const puntaje={}

puntaje.crear=(req,res)=>{
    try {
        db.crearpuntos(req,res)
    } catch (e) {
        console.log(e)
    }
}

puntaje.buscar=(req,res)=>{
    try {
        db.buscarpuntos
    } catch (e) {
        console.log(e)
    }
}







module.exports= puntaje