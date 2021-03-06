const passport = require('passport');
const { Strategy } = require('passport-local');
const { Pool } = require('pg');
const helpers =require('./helpers')

const config={
  
  user:'postgresql',
  host:'localhost',
  password:'axel',
  database:'fenix',
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
         const validpassword= await helpers.compararclave(password,newuser.clave) 
        
         if(validpassword){
          
          done(null,newuser,console.log('bienvenido'))
          user.id=newuser.id_usuario
          passport.serializeUser((user,done)=>{
            done(null,user.id)
          })


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