# 🚀 Gerenciador de Usuários API

API RESTful para gerenciamento de usuários, construída com Node.js, Express e MongoDB.

## 🔗 Link da API Online
Acesse em: [https://api-users-icyc.onrender.com](https://api-users-icyc.onrender.com)

## 🛠️ Tecnologias Utilizadas
* **Node.js** & **Express** (Servidor)
* **MongoDB Atlas** & **Mongoose** (Banco de dados)
* **Bcrypt** (Criptografia de senhas) -----DESENVOLVENDO-----
* **CORS** (Segurança para frontend) -----DESENVOLVENDO-----

## 📌 Rotas da API

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| **GET** | `/usuarios` | Lista todos os usuários cadastrados. |
| **GET** | `/usuarios/:id` | Busca um usuário específico pelo ID. |
| **POST** | `/usuarios` | Cadastra um novo usuário (Requer Nome, Email e Senha). |
| **PUT** | `/usuarios/:id` | Atualiza os dados de um usuário existente. |
| **DELETE** | `/usuarios/:id` | Remove um usuário do sistema. |

## ⚙️ Como rodar o projeto localmente
1. Clone o repositório.
2. Rode `npm install` para instalar as dependências.
3. Crie um arquivo `.env` e adicione sua `MONGODB_URI`.
4. Rode `npm start` ou `node api.js`.

## Outras informações
npm install swagger-ui-express