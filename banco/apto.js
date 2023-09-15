
//const connect = require('./conexao')

const pool = require('./conexao')

async function getApartamentos(){
    //const apto = await connect();
    //const res = await apto.query("SELECT * FROM apartamento ORDER BY apt_numapa ASC;");
    const res = await pool.query("SELECT apt_numapa, apt_desapa, apt_numocu FROM apartamento ORDER BY apt_numapa ASC;");
    return res.rows;
  }
  
  module.exports = {
    getApartamentos
  }
