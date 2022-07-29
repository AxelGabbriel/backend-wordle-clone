const {Pool}= require('pg');
const crearusuario = require('../database')
const modificarusuario= require('../database')
const buscaridusuario=require('../database')
const buscarnombreusuario= require('../database')
const{v4: uuidv4}= require('uuid')
const {gettoken,gettokenData}=require('../jwt')
const {sendEmail,getTemplate}= require('../email.config')
//constante vacia para las instancias

const usuario = {}
const config={
  
    user:'postgres',
    host:'localhost',
    password:'axel',
    database:'wordle',
    //ssl:{rejectUnauthorized:false}
  };
    
 const pool = new Pool(config); 





usuario.verificar= async (req,res)=>{
   //obtener data usuario
     const {username,email}=req.body
     const response= await pool.query('SELECT* FROM usuario WHERE  username=$1',[username])
     const code= uuidv4();
     const token= gettoken({email,code})
        const template= getTemplate(username,token)
     if (response) {
        const user= response.rows[0]
        
        if (user.correo===email) {
         await sendEmail(email,'este es un email de prueba',template);
        
       res.json('usuario encontrado correctamente')
      } else {
         console.log('email invalido')
      }
     } else {
        console.log('no existe el usuario')
     }
     
     
    
     

    


}

usuario.register= (req,res)=>{
 try{
 crearusuario.crearusuario(req,res);


 }catch(e){

    console.log(e);
 }
   
   
}

usuario.modificar=(req,res)=>{
   try{
   modificarusuario.modificarusuario(req,res);

}catch(e){
    console.log(e)
}

};
    
usuario.buscarid=(req,res)=>{
 try{
    buscaridusuario.buscaridusuario(req,res);



 }catch(e){
    console.log(e)


 }

}


usuario.buscarnombreusuario=(req,res)=>{
    try{
       
        buscarnombreusuario.buscarnombreusuario(req, res)
        
    }catch(e){
        console.log(e)
    }

    
}




module.exports= usuario