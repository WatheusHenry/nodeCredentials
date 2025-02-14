# Local Credentials

Um pacote Node.js desenvolvido para armazenar e gerenciar credenciais de forma segura como o `@laravel/credentials`, utilizando criptografia AES-256 e banco de dados MySQL. Esta solução é ideal para projetos que necessitam armazenar informações sensíveis como chaves de API, tokens de acesso e outras credenciais de forma segura e organizada.

## 🔐 Características principais

- Criptografia AES-256 para máxima segurança
- Integração com MySQL para armazenamento persistente
- Interface de linha de comando simples e intuitiva
- Gerenciamento completo de credenciais (adicionar, buscar, listar e remover)
- Configuração simplificada via arquivo .env

## 📌 Instalação

Para instalar o pacote em seu projeto, execute o seguinte comando:

```bash
npm install @watheushenry/local-credentials
```

## 🔧 Configuração

### Pré-requisitos
- Node.js instalado
- MySQL Server em execução
- Banco de dados criado para armazenamento das credenciais

### Configuração do ambiente

Crie um arquivo `.env` na raiz do seu projeto com as seguintes variáveis:

```env
DB_HOST=localhost      # Endereço do seu servidor MySQL
DB_USER=root          # Usuário do MySQL
DB_PASS=              # Senha do MySQL
DB_NAME=nome_do_banco # Nome do banco de dados
SECRET_KEY=0123456789abcdef0123456789abcdef # Chave secreta para criptografia
```

**Importante**: Mantenha sua SECRET_KEY em segurança e nunca a compartilhe ou comita no controle de versão.


I'll update the README to include both CLI and programmatic usage examples:

## 🚀 Como Usar

O Local Credentials pode ser utilizado de duas formas: via linha de comando (CLI) ou programaticamente em seu código.

### 📟 Usando via CLI

#### ✅ Salvando credenciais

```bash
npx credentials set <chave> "<valor>"
```

Exemplo prático:
```bash
npx credentials set API_KEY "minha_chave_secreta"
```

#### 🔍 Recuperando credenciais

```bash
npx credentials get <chave>
```

Exemplo prático:
```bash
npx credentials get API_KEY
```

#### 📜 Listando todas as credenciais

```bash
npx credentials list
```

#### 🗑️ Removendo credenciais

```bash
npx credentials delete <chave>
```

Exemplo prático:
```bash
npx credentials delete API_KEY
```

### 💻 Usando programaticamente

Você também pode integrar o Local Credentials diretamente em seu código:

```javascript
const { setCredential, getCredential, listCredentials, deleteCredential } = require('@watheushenry/local-credentials');

async function exemploDeUso() {
  try {
    // 1. Salvar credencial
    await setCredential("apiKey", "meu-segredo-super-seguro");
    console.log("✅ Credencial salva!");

    // 2. Listar credenciais
    console.log("\n🔑 Credenciais salvas:");
    await listCredentials();

    // 3. Obter credencial
    const value = await getCredential("apiKey");
    console.log(`\n🔍 Valor da credencial: ${value}`);

    // 4. Deletar credencial
    await deleteCredential("apiKey");
    console.log("\n🗑️ Credencial removida!");
  } catch (error) {
    console.error("Erro:", error.message);
  }
}

// Executar o exemplo
exemploDeUso();
```

### 📝 Detalhes das funções

- `setCredential(chave, valor)`: Salva uma nova credencial ou atualiza uma existente
- `getCredential(chave)`: Recupera o valor de uma credencial específica
- `listCredentials()`: Retorna uma lista de todas as credenciais salvas
- `deleteCredential(chave)`: Remove uma credencial específica

### ⚡ Exemplo de integração em um projeto real

```javascript
const { setCredential, getCredential } = require('@watheushenry/local-credentials');

async function inicializarAPI() {
  try {
    // Salvar uma nova chave de API
    await setCredential('STRIPE_API_KEY', 'sk_test_...');
    
    // Recuperar a chave quando necessário
    const apiKey = await getCredential('STRIPE_API_KEY');
    
    // Usar a chave em sua aplicação
    const stripe = require('stripe')(apiKey);
    
    // ... resto da sua lógica
  } catch (error) {
    console.error('Erro ao gerenciar credenciais:', error);
  }
}
```

[rest of the README remains the same]

Would you like me to add any other examples or make any modifications to the explanations?

## ⚠️ Boas Práticas de Segurança

1. Sempre utilize senhas fortes para o banco de dados
2. Mantenha sua SECRET_KEY em um ambiente seguro
3. Evite compartilhar credenciais em texto plano
4. Faça backup regular do banco de dados
5. Monitore o acesso às credenciais

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Se você encontrou um bug ou tem uma sugestão de melhoria, por favor:

1. Abra uma issue descrevendo o problema/sugestão
2. Fork o repositório
3. Crie uma branch para sua feature/correção
4. Envie um pull request

---

Desenvolvido com ❤️ por WatheusHenry

