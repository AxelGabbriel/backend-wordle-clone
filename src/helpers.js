const bcrypt= require('bcrypt')
const helpers = {};

helpers.encryptPassword= async (password)=>{
    const salt= await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt)
    return hash;
};

helpers.compararclave= async(password,savepassword)=>{
    try {
       return  await bcrypt.compare(password,savepassword)
      
    } catch (e) {
        console.log(e)
    }
};

module.exports=helpers
