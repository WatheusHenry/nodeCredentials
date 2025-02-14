const mysql = require("mysql2/promise");
const crypto = require("crypto");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "supersecreto"; // Chave de criptografia

// Conexão com o MySQL
async function connectDB() {
  return mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "credentials_db",
  });
}

// Função para criptografar credenciais
function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const key = Buffer.from(SECRET_KEY.padEnd(32, ' ').slice(0, 32), 'utf8');
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

// Função para descriptografar credenciais
function decrypt(text) {
  const [iv, encryptedText] = text.split(":");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(SECRET_KEY, "utf8"),
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// Criar tabela se não existir
async function setupDatabase() {
  const connection = await connectDB();
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS credentials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    key_name VARCHAR(191) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
  `);
  console.log("✅ Banco de dados configurado!");
}

// Função para salvar credenciais com verificação de criação da tabela
async function setCredential(key, value) {
  const db = await connectDB();

  // Verificar se a tabela existe e criar se não existir
  await setupDatabase();

  const encryptedValue = encrypt(value);
  await db.execute(
    `INSERT INTO credentials (key_name, value, created_at, updated_at) 
     VALUES (?, ?, NOW(), NOW()) 
     ON DUPLICATE KEY UPDATE value = ?, updated_at = NOW()`,
    [key, encryptedValue, encryptedValue]
  );
  await db.end();
  console.log(`✅ Credencial "${key}" salva/atualizada com sucesso!`);

  // Finaliza o processo corretamente
  process.exit(0);
}

// Função para buscar credenciais
async function getCredential(key) {
  const db = await connectDB();
  const [rows] = await db.execute(
    "SELECT value FROM credentials WHERE key_name = ?",
    [key]
  );
  await db.end();

  if (rows.length === 0) {
    console.log(`❌ Credencial "${key}" não encontrada.`);
    return null;
  }
  return decrypt(rows[0].value);
}

// Função para listar credenciais
async function listCredentials() {
  const db = await connectDB();
  const [rows] = await db.execute("SELECT key_name FROM credentials");
  await db.end();

  rows.forEach((cred) => console.log(`🔑 ${cred.key_name}`));
}

// Função para remover credenciais
async function deleteCredential(key) {
  const db = await connectDB();
  await db.execute("DELETE FROM credentials WHERE key_name = ?", [key]);
  await db.end();
  console.log(`🗑️ Credencial "${key}" removida.`);

  // Finaliza o processo corretamente
  process.exit(0);
}

module.exports = {
  setCredential,
  getCredential,
  listCredentials,
  deleteCredential,
};
