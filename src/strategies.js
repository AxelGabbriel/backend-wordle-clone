const passport = require('passport');
const { Strategy } = require('passport-local');
const { Pool } = require('pg');
const helpers =require('./helpers')

const config={
  
  connectionString: process.env.DATABASE_URL,
  max:500,
  min:100,
  ssl:{rejectUnauthorized:false}
  //user:'tfkzbfkhvyyogq',
  //host:'lec2-54-87-179-4.compute-1.amazonaws.com',
  //password:'516addb3081867d7455ecdee1b474eac4c7c8bed7f5a140523f445cff164eff9',
  //database:'d88nc35tlkcnon',
  //ssl:{rejectUnauthorized:false}
};
  
  const pool = new Pool(config); 
  
  const LocalStrategy = new Strategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      
      const user={
        username:username,
        clave:password
      }
      const result= await pool.query('SELECT* FROM usuario WHERE username=$1',[user.username])
      if(result.rows.length>0){
         const newuser =result.rows[0];
         const validpassword= await helpers.compararclave(user.clave,newuser.clave) 
        
         if(validpassword){
          
          done(null,newuser,console.log('bienvenido'))
          


         }else{
              done(null,false,console.log('password incorrecto'))
              
         }
      }else{
        return done(null, false,console.log('el usuario no existe'))   
        
      }
      
    } catch (e) {
      console.log(e);
      return done(null, false);
    }
  }
);



passport.deserializeUser( async (id_usuario,done)=>{
    const rows = await pool.query('SELECT * FROM usuario WHERE id_usuario=?',[id_usuario])
    done(null,rows[0])
})

module.exports={
  LocalStrategy
}