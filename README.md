Com certeza\! Aqui está o conteúdo do ficheiro `README.md` em formato raw Markdown, pronto para copiar e colar.

````markdown
# API de Gestão para Restaurante

API RESTful desenvolvida em Node.js para gerir os pedidos de pratos de um restaurante. O projeto permite o controlo completo de clientes, pratos e pedidos, além de gerar relatórios estratégicos.

## Funcionalidades Principais

* **Gestão de Pratos**: CRUD completo para os pratos do menu.
* **Gestão de Clientes**: CRUD completo para os clientes, com validação de CPF.
* **Sistema de Pedidos**: Permite que um cliente faça um pedido com um ou mais pratos.
* **Relatórios Analíticos**:
    * Listar os pratos mais populares (ordenados por quantidade de pedidos).
    * Listar os 5 clientes que mais fizeram pedidos.
    * Listar os 5 clientes que mais gastaram.

## Tecnologias Utilizadas

* **Backend**: Node.js
* **Framework**: Express.js
* **Base de Dados**: SQLite
* **ORM (Object-Relational Mapper)**: Sequelize
* **Ambiente de Desenvolvimento**: Nodemon para reinício automático do servidor.

## Como Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto no seu ambiente local.

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão LTS recomendada)
* [NPM](https://www.npmjs.com/) (geralmente instalado com o Node.js)

### Passos para Instalação

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    ```

2.  **Aceda à pasta do projeto:**
    ```bash
    cd <NOME_DA_PASTA_DO_PROJETO>
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O servidor estará a rodar em `http://localhost:3000`. O ficheiro da base de dados `restaurante.sqlite` será criado automaticamente na raiz do projeto na primeira execução.

## Estrutura da API (Endpoints)

A seguir, um resumo das rotas disponíveis na API.

### Pratos

| Método | Rota          | Descrição                |
| :----- | :------------ | :----------------------- |
| `POST` | `/pratos`     | Cria um novo prato.      |
| `GET`  | `/pratos`     | Lista todos os pratos.   |
| `GET`  | `/pratos/:id` | Busca um prato por ID.     |
| `PUT`  | `/pratos/:id` | Atualiza um prato por ID.  |
| `DELETE`| `/pratos/:id` | Apaga um prato por ID.      |

### Clientes

| Método | Rota           | Descrição                 |
| :----- | :------------- | :------------------------ |
| `POST` | `/clientes`    | Cria um novo cliente.     |
| `GET`  | `/clientes`    | Lista todos os clientes.  |
| `GET`  | `/clientes/:id`| Busca um cliente por ID.    |
| `PUT`  | `/clientes/:id`| Atualiza um cliente por ID. |
| `DELETE`| `/clientes/:id`| Apaga um cliente por ID.     |

### Pedidos

| Método | Rota       | Descrição               |
| :----- | :--------- | :---------------------- |
| `POST` | `/pedidos` | Cria um novo pedido.    |
| `GET`  | `/pedidos` | Lista todos os pedidos. |

### Relatórios

| Método | Rota                              | Descrição                                    |
| :----- | :-------------------------------- | :------------------------------------------- |
| `GET`  | `/relatorios/pratos-populares`    | Mostra os pratos mais pedidos.               |
| `GET`  | `/relatorios/clientes-mais-pedidos`| Mostra os top 5 clientes por número de pedidos. |
| `GET`  | `/relatorios/clientes-maior-gasto` | Mostra os top 5 clientes por valor gasto.      |

````
