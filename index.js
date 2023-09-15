require("dotenv").config();

const port = process.env.APP_PORT;

const express = require('express');
const app = express();

const bodyParser = require('body-parser')

const db_port = process.env.DB_PORT;
const db_host = process.env.DB_HOST;
const db_name = process.env.DB_NAME;

const db = require("./banco/conexao");
const apto = require("./banco/apto");

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({
        message: `API: ${port} dbport: ${db_port} host: ${db_host} bd: ${db_name}`
    })
})

app.get('/suites', async (req, res) => {
    console.log(`get /suites`);
    const suites = await db.getSuites();
    //const aptos = await apto.getApartamentos(); --linha com erro
    res.json(suites);
})

app.get('/suiteslivres', async (req, res) => {
    console.log(`get /suiteslivres`);
    const suites = await db.getSuiteslivres();
    res.json(suites);
})

app.get('/suitesocupadas', async (req, res) => {
    console.log(`get /suitesocupadas`);
    const suites = await db.getSuitesocupadas();
    res.json(suites);
})

app.listen(port, () => {
    console.log(`API rodando em ${port}.`)
})


