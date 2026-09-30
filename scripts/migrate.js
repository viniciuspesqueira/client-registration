// Aplica as migrations pendentes de db/migrations.
// Uso: npm run db:migrate

require("dotenv").config()
const fs = require("fs")
const path = require("path")
const mysql = require("mysql2/promise")
const { connectionConfig } = require("../db")

const MIGRATIONS_DIR = path.join(__dirname, "..", "db", "migrations")

async function main() {
  const config = connectionConfig()

  // Mostra o destino antes de mexer em qualquer coisa: é a sua chance de
  // perceber que apontou para produção sem querer.
  console.log(`Banco: ${config.database} em ${config.host}\n`)

  // multipleStatements permite que um arquivo .sql tenha vários comandos
  // separados por ponto e vírgula.
  const conn = await mysql.createConnection({
    ...config,
    multipleStatements: true,
  })

  // A tabela de controle: é ela que guarda a memória do que já rodou.
  await conn.query(`
    CREATE TABLE IF NOT EXISTS _migrations (
      name       VARCHAR(255) NOT NULL PRIMARY KEY,
      applied_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `)

  const [rows] = await conn.query("SELECT name FROM _migrations")
  const aplicadas = new Set(rows.map((row) => row.name))

  const pendentes = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((nome) => nome.endsWith(".sql"))
    .sort()
    .filter((nome) => !aplicadas.has(nome))

  if (pendentes.length === 0) {
    console.log("Banco já está atualizado, nada a aplicar.")
    await conn.end()
    return
  }

  for (const nome of pendentes) {
    const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, nome), "utf8")
    process.stdout.write(`Aplicando ${nome} ... `)
    await conn.query(sql)
    await conn.query("INSERT INTO _migrations (name) VALUES (?)", [nome])
    console.log("ok")
  }

  await conn.end()
  console.log(`\n${pendentes.length} migration(s) aplicada(s).`)
}

main().catch((erro) => {
  console.error("\nFalha ao aplicar migrations:", erro.message)
  process.exit(1)
})
