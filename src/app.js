const express = require ('express')
const passport=require('passport')
const session=require('express-session')
const flash = require('express-flash')
const app = express()
const {Strategy} =require('passport-local')
const { LocalStrategy } = require('./strategies')

const Socketio= require('socket.io')

//middlewares
app.use(session({
    secret:'xd',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

passport.use(LocalStrategy);
passport.serializeUser((user, done) => {
    done(null, JSON.stringify(user));
  });
  
  passport.deserializeUser((user, done) => {
    done(null, JSON.parse(user));
  });

app.use(passport.initialize())
app.use(passport.session());
//router
app.use(require('./routes/router'));


//const port =process.env.PORT || 5000;

//servidor activo
const server=app.listen(8000, ()=>{
  console.log('servidor activo en puerto 8000')
})



//config de sockets
const io=Socketio(server)

//sockets
io.on('connection',()=>{
  console.log('un usuario se ha conectado')
})





