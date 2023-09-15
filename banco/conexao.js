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
}

connect();

async function getApartamentos(){
  const apto = await connect();
  //const res = await apto.query("SELECT * FROM apartamento ORDER BY apt_numapa ASC;");
  const res = await apto.query("SELECT apt_numapa, apt_desapa, apt_numocu FROM apartamento ORDER BY apt_numapa ASC;");
  return res.rows;
}

module.exports = {
  getApartamentos
}

//const { Pool } = require("pg");
//const pool = new Pool({
//  user: process.env.DB_USER,
//  host: process.env.DB_HOST,
//  database: process.env.DB_NAME,
//  password: process.env.DB_PASSWORD,
//  port: process.env.DB_PORT,
//});

//module.exports = pool;