const fs = require('fs');
const path = require('path');

// Caminho para o arquivo binário
const binDir = path.join(__dirname, '..', 'bin');

// Verifica se a pasta bin existe, caso contrário, cria
if (!fs.existsSync(binDir)) {
  fs.mkdirSync(binDir, { recursive: true });
}

// Cria o arquivo cli.js se não existir
const cliPath = path.join(binDir, 'cli.js');

if (!fs.existsSync(cliPath)) {
  const cliContent = `
#!/usr/bin/env node
const { setCredential, getCredential, listCredentials, deleteCredential } = require("../src/credentials");

const { Command } = require("commander");
const program = new Command();

program.version("1.0.0").description("Gerenciador de credenciais");

// Adicionar credencial
program.command("set <key> <value>").description("Armazena uma credencial").action(setCredential);

// Buscar credencial
program.command("get <key>").description("Recupera uma credencial").action(async (key) => {
  const value = await getCredential(key);
  if (value) console.log(\`🔐 Valor: \${value}\`);
});

// Listar credenciais
program.command("list").description("Lista todas as credenciais").action(listCredentials);

// Remover credencial
program.command("delete <key>").description("Remove uma credencial").action(deleteCredential);

program.parse(process.argv);
`;

  fs.writeFileSync(cliPath, cliContent, 'utf-8');
  fs.chmodSync(cliPath, '755'); // Torna o arquivo executável
  console.log('✅ Comando CLI "credentials" configurado com sucesso!');
}
