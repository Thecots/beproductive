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
  const anual = await sql(`SELECT count(*) as count FROM goals WHERE YEAR(created) = ${date.getFullYear()} AND class = 1 AND checked = 0 AND user = ${req.session.id}`)
  const mensual = await sql(`SELECT count(*) as count FROM goals WHERE MONTH(created) = ${date.getMonth()} AND class = 2 AND checked = 0 AND user = ${req.session.id}`)
  const diario = await sql(`SELECT count(*) as count FROM goals WHERE DAY(created) = ${date.getDate()} AND class = 3 AND checked = 0 AND user = ${req.session.id}`)
  
  res.json({
    ok: true,
    anual: anual.res[0].count,
    mensual: mensual.res[0].count,
    diario: diario.res[0].count
  })
})


router.post('/savegoal' , [session, getUserArea], async(req, res) => {
  let e = req.body
  let goal = await sql(`INSERT INTO goals VALUES (null,'${e.title}','${e.description}', 0, DATE '${e.data.year}/${e.data.month}/${e.data.day}', ${req.session.id}, ${e.type})`)
  res.json({ok:true, type: e.type, data: e.data})
})


router.post('/goals/year' , [session, getUserArea], async(req, res) => {
  const noc = await sql(`SELECT * FROM goals WHERE YEAR(created) = ${req.body.year} AND class = 1 AND user = ${req.session.id} AND checked = 0 ORDER BY id`)
  const sic = await sql(`SELECT * FROM goals WHERE YEAR(created) = ${req.body.year} AND class = 1 AND user = ${req.session.id} AND checked = 1 ORDER BY id`)
  res.json({ok:true, noc: noc.res, sic: sic.res, year: req.body.year})
})

router.post('/goals/month' , [session, getUserArea], async(req, res) => {
  const noc = await sql(`SELECT * FROM goals WHERE YEAR(created) = ${req.body.year} AND MONTH(created) = ${req.body.month} AND class = 2 AND user = ${req.session.id} AND checked = 0 ORDER BY id`)
  const sic = await sql(`SELECT * FROM goals WHERE YEAR(created) = ${req.body.year} AND MONTH(created) = ${req.body.month} AND class = 2 AND user = ${req.session.id} AND checked = 1 ORDER BY id`)
  res.json({ok:true, noc: noc.res, sic: sic.res, year: req.body.year, month: req.body.month})
})

router.post('/goals/day' , [session, getUserArea], async(req, res) => {
  const noc = await sql(`SELECT * FROM goals WHERE YEAR(created) = ${req.body.year} AND MONTH(created) = ${req.body.month} AND DAY(created) = ${req.body.day} AND class = 3 AND user = ${req.session.id} AND checked = 0 ORDER BY id`)
  const sic = await sql(`SELECT * FROM goals WHERE YEAR(created) = ${req.body.year} AND MONTH(created) = ${req.body.month} AND DAY(created) = ${req.body.day} AND class = 3 AND user = ${req.session.id} AND checked = 1 ORDER BY id`)
  res.json({ok:true, noc: noc.res, sic: sic.res, year: req.body.year, month: req.body.month, day: req.body.day})
})


router.post('/check' ,[session, getUserArea], async(req, res) => {
  const x = await sql(`UPDATE goals set checked = 1 WHERE id = ${req.body.id}`)
  res.json({ok:true, id: req.body.id})
})

router.post('/incheck' ,[session, getUserArea], async(req, res) => {
  const x = await sql(`UPDATE goals set checked = 0 WHERE id = ${req.body.id}`)
  res.json({ok:true, id: req.body.id})
})


router.use(require('./login.routes'))

module.exports = router;
