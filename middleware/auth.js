let jwt = require('jsonwebtoken');
let config = require('config');
function auth(req,res,next){
    const token = req.header('x-auth-token');
    if(!token){return res.status(401).send({message:'access denied. No token'})};
  try {
    let dcoded = jwt.verify(token, config.get('APP_KEY'));
    req.user = dcoded;
    next();
  }

  catch(error){
      return res.status(400).send({message:"Invalid token"});
  }


}

module.exports = auth;