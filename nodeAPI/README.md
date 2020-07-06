# NodeAPI

Essa é uma API simples desenvolvida com node.js, restify, mongoose e jwt.

O seu uso é gerenciar Clientes e Usuários.

## Como usar

### Instalando

````
npm install
````
***

### Configurando MongoDB na nuvem

O modo mais rápido de começar a usar é usar um banco de dados na nuvem.

Recomendo **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** que é fácil de usar e tem um plano gratis. Faça sua conta e crie seu banco de dados.

Copie sua string de conexão e cole no lugar de **your connection string here** no arquivo **config.js**, como ilustrado abaixo.

```javascript
module.exports = {
    ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || "http://localhost:3000",
    MONGODB_URI: process.env.MONGODB_URI || "<your connection string here>",
    JWT_SECRET: process.env.JWT_SECRET || 'secret'
}
```
***

### Executando

Sua API já está pronta para ser usada, e você tem os seguintes comandos disponíveis:

```
npm run dev

npm run start
```
***

### Endpoints da API

**Clientes**:

```
GET /apiv1/customers
GET /apiv1/customers/:id
POST /apiv1/customers
PUT /apiv1/customers
DELETE /apiv1/customers
```

**Usuarios**:

```
POST /apiv1/auth
POST /apiv1/user
PUT /apiv1/user/:id
DELETE /apiv1/user/:id
```

Recomendo usar [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para fazer o teste das requisições

**README escrito com [Visualizador Markdown](https://marceloesc.github.io/30-apps-30-dias/markdown%20previewer/)**

**[⬆ voltar ao topo](#NodeAPI)**