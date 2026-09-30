require("dotenv").config()
const mysql = require("mysql2/promise")

const REQUIRED_ENV = [
  "MYSQL_HOST",
  "MYSQL_PORT",
  "MYSQL_USER",
  "MYSQL_PASSWORD",
  "MYSQL_DATABASE",
]

function sslOptions() {
  const ca = process.env.MYSQL_SSL_CA
  if (!ca) return { rejectUnauthorized: false }

  const pem = ca.includes("BEGIN CERTIFICATE")
    ? ca
    : Buffer.from(ca, "base64").toString("utf8")
  return { ca: pem, rejectUnauthorized: true }
}

function connectionConfig() {
  const missing = REQUIRED_ENV.filter((name) => !process.env[name])
  if (missing.length > 0) {
    throw new Error(
      "Variáveis de ambiente do MySQL ausentes: " + missing.join(", ")
    )
  }

  return {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    ssl: sslOptions(),
  }
}

// Em serverless cada cold start reavalia o módulo, mas invocações "quentes"
// reaproveitam o processo: guardar o pool no global evita abrir uma conexão
// nova a cada request.
function getPool() {
  if (global.pool) return global.pool

  global.pool = mysql.createPool({
    ...connectionConfig(),
    waitForConnections: true,
    connectionLimit: 1,
    maxIdle: 1,
    idleTimeout: 60000,
  })

  return global.pool
}

async function selectClients() {
  const [rows] = await getPool().query("SELECT * FROM clients;")
  return rows
}

async function insertClient(client) {
  const sql = "INSERT INTO clients(name, age, UF) VALUES(?, ?, ?);"
  return await getPool().query(sql, [client.name, client.age, client.UF])
}

async function selectClient(idclient) {
  const sql = "SELECT * FROM clients WHERE idclient=?"
  const [rows] = await getPool().query(sql, [idclient])
  return rows && rows.length > 0 ? rows[0] : {}
}

async function updateClient(idclient, clients) {
  const sql = "UPDATE clients SET name=?, age=?, UF=? WHERE idclient=?"
  return await getPool().query(sql, [
    clients.name,
    clients.age,
    clients.UF,
    idclient,
  ])
}

async function deleteClient(idclient) {
  return await getPool().query("DELETE FROM clients WHERE idclient=?;", [
    idclient,
  ])
}

module.exports = {
  connectionConfig,
  selectClients,
  insertClient,
  updateClient,
  selectClient,
  deleteClient,
}
