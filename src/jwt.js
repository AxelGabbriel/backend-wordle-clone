const jwt= require('jsonwebtoken')

const gettoken=(payload)=>{
    return jwt.sign({
        data:payload
    },'SECRET',{expiresIn:'1h'});


}

const gettokenData=(toke)=>{
    let data=null;
    jwt.verify(token,'SECRET',(err,decoded)=>{
        if (err) {
            console.log('error al conseguir la data del token')
        } else {
            data=jwt.decode
        }
    });
    return data;
}


module.exports={gettoken,gettokenData}


