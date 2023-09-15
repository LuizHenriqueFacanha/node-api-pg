async function connect() {
  if (global.connection)
      return global.connection.connect();

  const { Pool } = require('pg');
  const pool = new Pool({
    connectionString: process.env.DB_STRING
    //user: process.env.DB_USER,
    //host: process.env.DB_HOST,
    //database: process.env.DB_NAME,
    //password: process.env.DB_PASSWORD,
    //port: process.env.DB_PORT
  });

  //testando a conexão
  const client = await pool.connect();
  console.log("Criou pool de conexões no PostgreSQL!");

  // fazendo select no banco
  const res = await client.query('SELECT NOW()');
  console.log(res.rows[0]);
  client.release();

  //guardando para usar sempre o mesmo
  global.connection = pool;
  return pool.connect();   
  
  module.exports = pool;

}

connect();

async function getSuites(){
  const suite = await connect();
  //const res = await apto.query("SELECT * FROM apartamento ORDER BY apt_numapa ASC;");
  //const res = await suite.query("SELECT apt_numapa, apt_sitapa, apt_numocu FROM apartamento ORDER BY apt_numapa ASC;");
  const res = await suite.query("SELECT apt_numapa, apt_sitapa, apt_numocu FROM apartamento ORDER BY apt_numapa ASC;");
  return res.rows;
}

async function getSuiteslivres(){
  const suite = await connect();
  const res = await suite.query("SELECT apt_numapa, apt_sitapa FROM apartamento WHERE apt_sitapa = 'DES' ORDER BY apt_numapa ASC;");
  return res.rows;
}

async function getSuitesocupadas(){
  const suite = await connect();
  const res = await suite.query("SELECT apt_numapa, apt_sitapa FROM apartamento WHERE apt_sitapa = 'OCU' ORDER BY apt_numapa ASC;");
  return res.rows;
}

module.exports = {
  getSuites,
  getSuiteslivres,
  getSuitesocupadas
}

