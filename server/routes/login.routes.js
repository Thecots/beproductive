const { sql } = require("../helpers/connector");
const {session, login} = require('./../middlewares/session');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

router.get('/login',[session,login], (req, res) => {
  res.render('login', {site: 'login'})
})

router.post('/login',[session, login], async(req, res) => {
  console.clear();
  try {
    if(req.body.username.length > 15 || req.body.passwd.length > 15) return res.json({ok: false, error: "Usuario o contraseña incorrectos1"})
    let x = await sql(`SELECT id, username, passwd FROM users WHERE username = '${req.body.username}'`);
    if(!x.ok || x.res.length === 0) return res.json({ok: false, error: "Usuario o contraseña incorrectos2"});
    if(bcrypt.compareSync(req.body.passwd, x.res[0].passwd)){
      let token = jwt.sign(
        {
          username: x.res[0].username,
          id: x.res[0].id
        },
        process.env.JWTSEED,
        { expiresIn: '9999days'}
      );
      res.setHeader("X-Access-Token", token);
      return res.json({ok: true, token})
    }else return res.json({ok: false, error: "Usuario o contraseña incorrectos3"})
  } catch (error) {
    console.log(error);
    return res.json({ok: false, error: "Usuario o contraseña incorrectos4"})
  }
})

module.exports = router;
