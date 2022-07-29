const {Pool}= require('pg');
const helpers= require('./helpers')
const config={
    user:'postgres',
    host:'localhost',
    password:'axel',
    database:'wordle',
};

const pool = new Pool(config);

//funcion de crear usuario para registro
const crearusuario= async(req,res)=>{
    
const  { 
     username,
     correo,
     nombre,                             
     contraseña
      }= req.body;
      const passwordencriptado= await helpers.encryptPassword(contraseña);
       const result= await pool.query('INSERT INTO usuario(username,correo,nombre,contraseña) VALUES($1,$2,$3,$4)', [
      username,correo,nombre,passwordencriptado ])
   console.log(result)
  res.json(result.rows)
   
}
//funcion para actualizar usuario
const modificarusuario=async(req,res)=>{
    
    const {username,correo,nombre,contraseña,id_usuario}= req.body
    const response= await pool.query('UPDATE usuario SET username= $1 , correo=$2 ,nombre=$3,contraseña=$4 WHERE id_usuario=$5',[
        username,correo,nombre,contraseña,id_usuario
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

//rutas de rooms 

//crear room
const crearroom= async(req,res)=>{
    const {id_room,rondas,tiempo,autor}=req.body
    const result= await pool.query('INSERT INTO usuario(id_room,rondas,tiempo,autor) VALUES($1,$2,$3,$4)', [
        id_room,rondas,tiempo,autor ])
     console.log(result)
    res.json(result.rows)

}

//leer todas las rooms
const leerroom=async(req,res)=>{
    const result= await pool.query('SELECT*FROM room')
    res.json(result.rows);
}

//buscar room por id_room
const buscarroom=async(req,res)=>{
    const id_room=req.body
    const response=await pool.query('SELECT * FROM room WHERE id_room=$1',[id_room])
    console.log(response)
    res.json(response.rows)
}

//modificar sala 
const modificarsala=async(req,res)=>{
     const {id_room,rondas,tiempo,autor}=req.body
    
    const result= await pool.query('UPDATE room set id_room=$1, rondas=$2, tiempo=$3, autor=4$',[
        id_room,rondas,tiempo,autor
     ])
     console.log(result)
     res.json(result.rows)
}


//borrar sala 
const borrarsala=async(req,res)=>{
    const id_room= req.body
    const result=await pool.query('DELETE FROM room where id_room=$1',[
        id_room
    ])
    console.log(result)
    res.json(result.rows)
}

// puntaje
//creando puntos
const crearpuntos=async(req,res)=>{
const {id_usuario,id_sala,puntos}=req.body
  const result= await pool.query('INSERT INTO puntaje (id_usuario,id_sala,puntos) values($1,$2,$3)',[
    id_usuario,id_sala,puntos
  ])
 console.log(result)
 res.json(result.rows)
}
   //buscar puntos de un usuario
   const buscarpuntos=async(req,res)=>{
      const id_usuario= req.params.id_usuario
      const result= await pool.query('SELECT * FROM puntaje WHERE  id_usuario=$1',[id_usuario])
      const user= result.rows[0]
      console.log(result)
      res.json(user.puntos)


   }
module.exports={
   borrarsala,
    buscarpuntos,
    crearpuntos,
    modificarsala,
    buscarroom,
    leerroom,
    modificarusuario,
    crearusuario,
    crearroom,
    buscaridusuario,
    buscarnombreusuario
   
}
