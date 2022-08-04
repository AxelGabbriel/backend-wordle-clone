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
     correo,
     nombre,                             
     contraseña,
     verificarlave
      }= req.body;
     const passwordencriptado = await helpers.encryptPassword(contraseña)
     const verificar = await helpers.encryptPassword(verificarlave)
     //const seguir= await helpers.compararclave(passwordencriptado,verificar)
      if(passwordencriptado===verificar){
        const result= await pool.query('INSERT INTO usuario(username,correo,nombre,contraseña) VALUES($1,$2,$3,$4)', [
         username,correo,nombre,passwordencriptado ])
         console.log(result)
         res.json(result.rows)

      }else{
        res.json('contraseñas incompatibles')
      }
      
   
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
    const {id_room,rondas,autor}=req.body
    const result= await pool.query('INSERT INTO room(id_room,rondas,autor) VALUES($1,$2,$3)', [
        id_room,rondas,autor ])
     console.log(result)
    res.json(result.rows)

}

//leer todas las rooms
const leerroom=async(req,res)=>{
    const result= await pool.query('SELECT*FROM room')
    res.json(result.rows);
}

//buscar room por id_room
const buscarroomid=async(req,res)=>{
    const id_room=req.params.id_room
    const response=await pool.query('SELECT * FROM room WHERE id_room=$1',[id_room])
    const codigo= response.rows[0]
    res.json(codigo.id_room)

}

//buscar room por autor
const buscarroomautor=async(req,res)=>{
    const id_room=req.params.id_room
    const response=await pool.query('SELECT * FROM room WHERE id_room=$1',[id_room])
    const codigo= response.rows[0]
    res.json(codigo.autor)

}
//buscar room por rondas
const buscarroomrondas=async(req,res)=>{
    const id_room=req.params.id_room
    const response=await pool.query('SELECT * FROM room WHERE id_room=$1',[id_room])
    const codigo= response.rows[0]
    res.json(codigo.rondas)

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
    const {id_room}= req.body
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
   buscarroomautor,
   buscarroomrondas,
    borrarsala,
    buscarpuntos,
    crearpuntos,
    modificarsala,
    buscarroomid,
    leerroom,
    modificarusuario,
    crearusuario,
    crearroom,
    buscaridusuario,
    buscarnombreusuario
   
}
