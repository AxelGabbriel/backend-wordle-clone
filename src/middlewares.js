const passport= require('passport');

const passportAuth = (req, res, next) => {
  passport.authenticate('local', (err, newuser, info) => {
    if (err) {
      return next(err);
    }
    if (!newuser) {
      return res.status(401).send({
        err: info,
        
      });
    }
    req.logIn(newuser, function (err) {
      if (err) {
        console.log(err)
        return res.status(500).send({
          err: 'Could not log in user',
          failureRedirect:'/login'
        });
      }
      res.status(200).send({
        status: 200,
        msg:'Login successful!',
        sucessRedirect:'/perfil'
      });
    });
  })(req, res, next);
};

module.exports={
  passportAuth
}