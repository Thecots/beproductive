const mysql = require('mysql');

let con = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWD,
  database: process.env.DBNAME
});

function sql(sql){
  try {
    return new Promise(res => {
      con.query(sql, function (err, result) {
        if (err) res({ok:false, error: err})
        res({ok: true, res: result})
      });
    })
  } catch (error) {
    return {ok:false, error};
  }
}

module.exports = {
  sql
}