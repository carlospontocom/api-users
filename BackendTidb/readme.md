# 📇 Gerenciador de Contatos - Fullstack

Um sistema de gerenciamento de usuários (CRUD) desenvolvido para oferecer uma interface rápida e intuitiva. O projeto integra uma interface moderna em React com um backend robusto em Node.js conectado ao banco de dados MySQL na nuvem.

---

## 🚀 Tecnologias e Ferramentas

O ecossistema do projeto foi construído com:

### **Frontend**
* **React.js**: Biblioteca principal para construção da interface.
* **Tailwind CSS**: Framework CSS para estilização rápida e responsiva.
* **Axios**: Cliente HTTP para consumo da API.

### **Backend**
* **Node.js & Express**: Servidor e gerenciamento de rotas.
* **CORS**: Middleware para permitir a comunicação entre o frontend e o backend.
* **MySQL (TiDB Cloud)**: Banco de dados relacional distribuído e serverless para armazenamento dos dados.

### **Versionamento**
* **GitHub**: Repositório remoto e controle de versão.

---

## 🛠️ Funcionalidades Implementadas

* **Listagem Dinâmica**: Renderização automática dos usuários vindos do banco de dados.
* **Sistema de Busca**: Filtro em tempo real por nome (case-insensitive).
* **Criação de Usuário**: Modal com formulário para cadastro de novos contatos.
* **Edição (Update)**: Fluxo de edição que pré-preenche os dados do usuário selecionado.
* **Exclusão (Delete)**: Remoção de registros com alerta de confirmação.

---

## 📁 Estrutura do Banco de Dados (TiDB Cloud)

A tabela de usuários no MySQL segue o seguinte esquema básico:
- `id`: INT (Primary Key, Auto Increment)
- `nome`: VARCHAR(255)
- `email`: VARCHAR(255)
- `senha`: VARCHAR(255)

---

## 🔧 Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    ```

2.  **Instale as dependências (em ambas as pastas client/server):**
    ```bash
    npm install
    ```

3.  **Configure o Servidor:**
    Certifique-se de que sua API Express esteja rodando em `http://localhost:3000` e configurada com as credenciais do seu cluster no **TiDB Cloud**.

4.  **Inicie o Frontend:**
    ```bash
    npm start
    ```

---

## 📝 Notas de Desenvolvimento

O componente `ListaContatos` utiliza Hooks modernos do React:
- `useEffect` para disparar a função `atualizar()` assim que o componente é montado.
- `useState` para gerenciar o estado da barra de busca, modais e os dados vindos do backend.
- Lógica de filtro utilizando o método `.filter()` nativo do JavaScript para maior performance no lado do cliente.

---
Desenvolvido com foco em performance e escalabilidade.