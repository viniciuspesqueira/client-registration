require("dotenv").config()
const mysql = require("mysql2/promise")

async function connect() {
  if (global.connection && global.connection.UF !== "disconnected")
    return global.connection
  const connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    // database user
    user: process.env.USER,
    // user password
    password: process.env.PASSWORD,
    database: "crud_app",
  })

  console.log("Conectou no MySQL!")
  global.connection = connection
  return global.connection
}

connect()

async function selectClients() {
  const conn = await connect()
  const [rows] = await conn.query("SELECT * FROM crud_app.clients;")
  return rows
}

async function insertClient(client) {
  const conn = await connect()
  const sql = "INSERT INTO crud_app.clients(name, age, UF) VALUES(?, ?, ?);"
  return await conn.query(sql, [client.name, client.age, client.UF])
}

async function selectClient(idclient) {
  const conn = await connect()
  const sql = "SELECT * FROM crud_app.clients WHERE idclient=?"
  const [rows] = await conn.query(sql, [idclient])
  return rows && rows.length > 0 ? rows[0] : {}
}

async function updateClient(idclient, clients) {
  const conn = await connect()
  const sql = "UPDATE crud_app.clients SET name=?, age=?, UF=? WHERE idclient=?"
  return await conn.query(sql, [
    clients.name,
    clients.age,
    clients.UF,
    idclient,
  ])
}

async function deleteClient(idclient) {
  const conn = await connect()
  return await conn.query("DELETE FROM crud_app.clients WHERE idclient=?;", [
    idclient,
  ])
}

module.exports = {
  selectClients,
  insertClient,
  updateClient,
  selectClient,
  deleteClient,
}
