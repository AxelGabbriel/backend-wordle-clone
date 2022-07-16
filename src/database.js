const {Pool}= require('pg');
const helpers= require('./helpers')
const config={
    connectionString: process.env.DATABASE_URL,
  max:500,
  min:100,
  ssl:{rejectUnauthorized:false}
};

const pool = new Pool(config);

//funcion de crear usuario para registro
const crearusuario= async(req,res)=>{
    
const  { 
     username,
     bio,
     correo,
     birthday,
     nombre, 
     direccion,                                
     clave
      }= req.body;
      const passwordencriptado= await helpers.encryptPassword(clave);
       const result= await pool.query('INSERT INTO usuario(username,bio,correo,birthday,nombre,direccion,clave) VALUES($1,$2,$3,$4,$5,$6,$7)', [
      username,bio,correo,birthday,nombre,direccion,passwordencriptado ])
   console.log(result)
  res.json(result.rows)
   
}
//funcion para actualizar usuario
const modificarusuario=async(req,res)=>{
    
    const {username,bio,correo,birthday,nombre,direccion,clave,id_usuario}= req.body
    const response= await pool.query('UPDATE usuario SET username= $1 ,bio=$2, correo=$3 ,birthday=$4,nombre=$5,direccion=$6,clave=$7 WHERE id_usuario=$8',[
        username,bio,correo,birthday,nombre,direccion,clave,id_usuario
    ])

    console.log(response)
    res.json(response.rows)
}





//buscando usuario por id
const buscaridusuario= async(req,res)=>{
    const id_usuario =req.params.id_usuario
    const response=await pool.query('SELECT* FROM usuario WHERE  id_usuario=$1',[id_usuario])
    console.log(response);
    res.json(response.rows)
} 

//buscando usuario por nombre
const buscarnombreusuario= async(req,res)=>{
    const nombre =req.params.nombre
    const response=await pool.query('SELECT* FROM usuario WHERE  nombre=$1',[nombre])
    console.log(response);
    res.json(response.rows)
} 


   
module.exports={
       
    
    modificarusuario,
    crearusuario,
    
    buscaridusuario,
    buscarnombreusuario
   
}
