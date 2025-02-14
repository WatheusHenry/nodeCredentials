#!/usr/bin/env node
const { Command } = require("commander");
const { setCredential, getCredential, listCredentials, deleteCredential } = require("../src/credentials");

const program = new Command();

program.version("1.5.0").description("Gerenciador de credenciais para Node.js");

// Adicionar credencial
program.command("set <key> <value>").description("Armazena uma credencial").action(setCredential);

// Buscar credencial
program.command("get <key>").description("Recupera uma credencial").action(async (key) => {
  const value = await getCredential(key);
  if (value) console.log(`🔐 Valor: ${value}`);
});

// Listar credenciais
program.command("list").description("Lista todas as credenciais").action(listCredentials);

// Remover credencial
program.command("delete <key>").description("Remove uma credencial").action(deleteCredential);

program.parse(process.argv);
