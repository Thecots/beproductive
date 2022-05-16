const express = require("express");
const router = express.Router();
const {session, getUserArea} = require('./../middlewares/session');

router.get('/', [session, getUserArea], async(req, res) => { 
  res.render('index', {
    site: 'index',
    session: req.session == undefined ? false : req.session
  })
})

router.use(require('./login.routes'))

module.exports = router;
