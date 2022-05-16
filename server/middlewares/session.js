const jwt = require('jsonwebtoken');
const { sql } = require('./../helpers/connector');

const session = async(req,res,next) => {
  jwt.verify(req.cookies.session, process.env.JWTSEED, (err, decoded) => {
  if(err) return next()
    req.session = {username: decoded.username, id: decoded.id}
    next()
  });
}

const login = (req,res,next) =>{
  try { 
    if(req.session == undefined) return next()
    return res.redirect('/')
  } catch (error) {
    res.redirect('/')
  }
}

const getUserArea = (req,res,next) =>{
  try { 
    if(req.session == undefined) return res.redirect('/login')
    next()
  } catch (error) {
    res.redirect('/login')
  }
 }

module.exports = {
  session,
  login,
  getUserArea
}