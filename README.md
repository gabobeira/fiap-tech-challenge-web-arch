# FIAP Tech Challenge - Fase 4

Projeto desenvolvido em grupo para o quarto tech challenge da FIAP.

## Resumo

Trata-se de uma plataforma fictícia para a empresa financeira "Bytebank".
O protótipo das telas desenvolvidas pode ser encontrado no [Figma](https://www.figma.com/design/ns5TC3X5Xr8V7I3LYKg9KA/Projeto-Financeiro?node-id=503-4264&t=nhWQMyJ7ZmXNWbb6-1).

## 📁 Arquitetura do projeto

A arquitetura da quarta fase do projeto levou em consideração as decisões arquiteturais do resultado da primeira fase com as novas features implementadas na segunda fase, tendo em vista que decidimos usar o mesmo projeto e expandir a partir dele.

A arquitetura anterior era focada em uma aplicação Next com diferentes renderizações e separação clara entre UI e dados.

A nova arquitetura é baseada nos princípios de "Clean Architecture", aplicando camadas para a separação de responsabilidades de acesso aos dados.
Estrutura:

- domain: contendo as entidades, abstrações de repositório e usecases;
- infra: cotendo as implementações dos repositórios;
- presentation: contendo os controllers responsaveis pela conexão entre as camadas.

![Clean arch preview](.github/clean-arch.jpg)

## 🔐 Segurança

A aplicação implementa mecanismos personalizados de segurança para autenticação, controle de sessões e proteção contra ataques de força bruta.

### 🛠️ Configurações de Segurança

As configurações estão centralizadas no objeto `config`:

```js
const config = {
  secret: crypto.randomBytes(16).toString("hex"), // Chave secreta única para geração de tokens
  tokenExpiration: 30 * 60 * 1000, // Expiração do token: 30 minutos
  saltLength: 16, // Tamanho do salt usado na criptografia do token
  maxLoginAttempts: 7, // Máximo de tentativas de login por IP
  lockTime: 60 * 1000, // Tempo de bloqueio após tentativas excessivas (1 minuto)
};
```

- **secret**: utilizado como chave base para criptografia dos tokens.
- **tokenExpiration**: define o tempo de validade de cada sessão autenticada.
- **saltLength**: define a aleatoriedade da criptografia dos tokens.
- **maxLoginAttempts**: limita o número de tentativas de login antes de bloquear.
- **lockTime**: define quanto tempo um IP fica bloqueado após ultrapassar as tentativas.

### 🔑 Autenticação por Token

- Utiliza tokens gerados com `crypto`, contendo informações como ID, e-mail e timestamp da sessão.
- Cada token é criptografado com HMAC-SHA256 e um `salt` aleatório.
- Tokens têm validade de 30 minutos e são armazenados em memória (`Map`).
- Um processo periódico (`setInterval`) remove tokens expirados e desbloqueia IPs.

### 🚫 Proteção Contra Força Bruta

- Limita a 7 tentativas de login por IP por minuto.
- Após isso, o IP é bloqueado temporariamente.
- Retorna erro `429` com tempo restante até o desbloqueio.

### 🔒 Validação de Requisições

- Endpoints protegidos exigem um token válido via header `Authorization: Bearer <token>`.
- Tokens inválidos, expirados ou ausentes resultam em erro `401 Unauthorized`.

### 🌐 CORS e Headers

- Permite requisições de qualquer origem (`*`).
- Métodos suportados: `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`.

## 👥 Registro e Autenticação de Usuários

### 📌 Registro (`POST /auth/register`)

- Cria um novo usuário em `auth` com `id`, `name`, `email` e `password`.
- Também cria uma conta bancária em `accounts` vinculada ao usuário, com:
  - `balance`: 0
  - `currency`: "R$"
  - `idUser`: ID do usuário recém-criado

### 🔐 Login (`POST /auth/login`)

- Verifica e-mail e senha do usuário em `auth`.
- Gera um token autenticado se for válido e retorna:

```json
{
  "token": "salt:hash::rawToken"
}
```

- Em caso de falha:
  - Aumenta o número de tentativas por IP.
  - Retorna erro `401` com a mensagem correspondente.

## 🗄️ Banco de Dados e Relacionamentos

O banco simulado `db.json` possui três coleções:

- **auth**: autenticação dos usuários.
- **accounts**: contas bancárias ligadas ao usuário.
- **transactions**: transações vinculadas às contas.

### 🔗 Relacionamentos

```
auth (usuário)
 └── accounts (contas)
       └── transactions (transações)
```

- Um usuário possui contas.
- Cada conta pode ter múltiplas transações.
- O endpoint `/transactions/account/:id` calcula o saldo da conta com base nas transações.
- O endpoint `/accounts/user/:idUser` retorna todas as contas do usuário, com saldos atualizados.

## Styleguide

Para o desenvolvimento do projeto nós seguimos o style guide proposto, porém com adaptações para seguir o [Material Design](https://m3.material.io/) e outras práticas que o grupo achou pertinente mudar.

![Style guide preview](.github/styleguide.png)
![Color pallete preview](.github/pallete.png)

## Demo

Video de demonstração do projeto no [Youtube](https://www.youtube.com/watch?v=nsbZ7x29SBY).

### Rodando o projeto

**Requisitos**

1. Tenha certeza que está usando a versão LTS do [Node.js (20.x)](https://nodejs.org/en)

   a. Recomendamos o uso do [nvm](https://github.com/nvm-sh/nvm)

   b. Caso esteja usando o nvm, antes de instalar as deps rode `nvm use` e se necessário `nvm install` e depois `nvm use` novamente.

Para instalar as deps quando já estiver utilizando a versão LTS do Node, rode `npm i` ou `npm install`.

### Ambiente de desenvolvimento local

1. Executar todas as aplicações: `npm run dev`

   a. Acompanhe a execução do Lerna nos diferentes projetos

   b. A api iniciará em [http://localhost:5000](http://localhost:5000)

   c. O app será executado em [http://localhost:3000](http://localhost:3000)

Para buildar o app basta executar `npm run build`.

2. Storybook e build da lib em watch mode: `npm run storybook`

   a. A documentação iniciará em [http://localhost:6006](http://localhost:6006) e a lib estará buildando em watch-mode (ou seja, voce pode fazer alterações e verificar nos projetos que consomem em tempo real, caso estejam rodando)

## Tecnologias utilizadas

- [Next.js](https://nextjs.org/): Meta-framework de [React.js](https://react.dev/) para construção de aplicações completas para produção;
- [Typescript](https://www.typescriptlang.org/): Runtime para JavaScript que possibilita a tipagem estática da linguagem;
- [Material UI](https://mui.com/): Framework de UI para construção de componentes com base nos guidelines do [Material design](https://m3.material.io/) e utilização de Style-In-JS com [Emotion](https://emotion.sh/docs/introduction).
- [Storybook](https://storybook.js.org/): Construção de documentação e biblioteca de componentes.
- [JSON Server](https://www.npmjs.com/package/json-server): Criação de um servidor local baseado em lowdb.
- [Zustand](https://zustand-demo.pmnd.rs/): Biblioteca para criação de stores.
- [RxJS](https://rxjs.dev/): Biblioteca de reatividade para JavaScript.
- [CloudFlare](https://www.cloudflare.com/pt-br/): Armazenamento em nuvem para otimização do carregamento de arquivos.
- [Crypto](https://www.w3schools.com/nodejs/ref_crypto.asp): Módulo em Node. js que lida com um algoritmo que realiza criptografia e descriptografia de dados

## Conceitos aplicados

- [Design System](https://www.figma.com/blog/design-systems-101-what-is-a-design-system/): Para construção de componentes reutilizáveis e padrões de tema, cores, espaçamentos e etc.
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html): Arquitetura baseada em camadas que facilita a separação de responsabilidades gerando sistemas robustos e resilientes.
- [Lazy Loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading): Técnica que atrasa o carregamento de recursos ou dados até que sejam realmente necessários.
- [Atomic design](https://atomicdesign.bradfrost.com/chapter-2/): Para componentização separada em categorias, possibilitando mais reutilização e semântica.
- [Colocation](https://kentcdodds.com/blog/colocation): Para organização dos diretórios e maior facilidade de trabalho.
- [Authentication](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Authentication): Estrutura de cadastro e login para proteção do sistema.
- [Salt + Hashing](https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/): Técnica de criptografia para dados de autenticação.
- [JWT](https://jwt.io/): JSON Web Tokens para armazenar informações do usuário e tempo de expiração, permitindo a autenticação contínua.

## Outras ferramentas úteis

- [Material Design Color Pallete](https://m2.material.io/inline-tools/color/): Para gerar a paleta de cores;
- [Adobe Color](https://color.adobe.com/create/color-contrast-analyzer): Para validar contraste;
