const express = require("express");
const { sql } = require("../helpers/connector");
const router = express.Router();
const {session, getUserArea} = require('./../middlewares/session');

router.get('/', [session, getUserArea], async(req, res) => { 
  res.render('index', {
    site: 'index',
    session: req.session == undefined ? false : req.session
  })
})

router.post('/getTareas', [session, getUserArea], async(req, res) => { 
  const date = new Date();
  const anual = await sql(`SELECT count(*) as count FROM goals WHERE YEAR(created) = ${date.getFullYear()} AND checked = 0 AND user = ${req.session.id}`)
  const mensual = await sql(`SELECT count(*) as count FROM goals WHERE MONTH(created) = ${date.getFullYear()} AND checked = 0 AND user = ${req.session.id}`)
  const diario = await sql(`SELECT count(*) as count FROM goals WHERE DAY(created) = ${date.getFullYear()} AND checked = 0 AND user = ${req.session.id}`)
  
  console.log(anual.res[0].count);
  res.json({
    ok: true,
    anual: diario.res[0].count,
    mensual: diario.res[0].count,
    diario: diario.res[0].count
  })
})

router.post('/goals/year' , [session, getUserArea], async(req, res) => {
  const anual = await sql(`SELECT count(*) as count FROM goals WHERE YEAR(created) = ${req.body.year} AND class = 0 AND user = ${req.session.id}`)
  res.json({ok:true, anual: anual.res})
})
router.use(require('./login.routes'))

module.exports = router;
