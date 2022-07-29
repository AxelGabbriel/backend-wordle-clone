const nodemailer= require('nodemailer')

const mail={
    user:'axelmiquilena@gmail.com',
    pass:'axel11607515'
}



let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: mail.user, // generated ethereal user
      pass: mail.pass, // generated ethereal password
    },
    tsl:{rejectUnauthorized:false},
    
  });
const sendEmail=async(email,subject,html)=>{
  try {
    
  let info = await transporter.sendMail({
    from:`AXEL codec <${ mail.user }>` , // sender address
    to: email, // list of receivers
    subject, // Subject line
    text: "hola amigos mios", // plain text body
    html, // html body
  });
  } catch (e) {
    console.log('algo no va bien con el email',e)
  }
}


const getTemplate = (username, token) => {
  return `
    <head>
        <link rel="stylesheet" href="./style.css">
    </head>
    
    <div id="email___content">
        <img src="https://i.imgur.com/eboNR82.png" alt="">
        <h2>Hola ${ username }</h2>
        <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
        <a
            href="http://localhost:8000/confirmado${ token }"
            target="_blank"
        >Confirmar Cuenta</a>
    </div>
  `;
}
  
module.exports= {
  sendEmail,
  getTemplate
}
