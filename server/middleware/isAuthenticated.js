const  jwt_decode = require( "jwt-decode");

const isAuth = {};


isAuth.isAuthenticated = (req, res, next) => {
    // const decoded = jwt_decode(req.headers.authorization.split(' ')[1]);
    // console.log( decoded.name,'yy');

  if(req.body.isAuth === 'true' || req.body.isAuth === true) {
    next();
  }else {
      res.json("please login first");
  }
  
};

module.exports = isAuth;
