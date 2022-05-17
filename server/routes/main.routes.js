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

router.post('/savegoal' , [session, getUserArea], async(req, res) => {
  let e = req.body
  let goal = await sql(`INSERT INTO goals VALUES (null,'${e.title}','${e.description}', 0, DATE '${e.data.year}/${e.data.month}/${e.data.day}', ${req.session.id}, ${e.type})`)
  console.log(goal.ok);
  res.json({ok:true, type: e.type, data: e.data})
})

router.use(require('./login.routes'))



module.exports = router;
