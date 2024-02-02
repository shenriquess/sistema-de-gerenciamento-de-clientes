# Sistema de Gerenciamento de Clientes

## Descrição
Este é um sistema simples de gerenciamento de clientes que permite adicionar clientes com informações como nome, email, telefone e coordenadas. Ele também fornece a funcionalidade de calcular a rota mínima para visitar todos os clientes.

## Ferramentas Utilizadas
- **Node.js (v20.11.0)**: O sistema é construído em Node.js, uma plataforma de tempo de execução JavaScript.
- **Express.js (v4.18.2)**: Utilizado para criar o servidor web e fornecer as rotas da API.
- **PostgreSQL (v16.1)**: Banco de dados usado para armazenar informações dos clientes e coordenadas.
- **npm (v10.2.4)**: Gerenciador de pacotes para o Node.js, usado para gerenciar as dependências do projeto.
- **Git (v2.43.0)**: Sistema de controle de versão para rastrear alterações no código-fonte durante o desenvolvimento de software.


## Configuração do Banco de Dados

### DDL da Tabela
Você pode usar o DDL abaixo para criar a tabela "clientes" no banco de dados PostgreSQL ou importar o DDL que se encontra na pasta DDL deste repositório.

```sql
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    coordenada_x INTEGER NOT NULL,
    coordenada_y INTEGER NOT NULL
);
```

### Inserção de Registros de Exemplo

Para começar a utilizar o sistema com dados, você pode inserir registros de exemplo na tabela "clientes". Use os seguintes comandos SQL para adicionar 10 clientes:

```sql
INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES
    ('Cliente 1', 'cliente1@example.com', '(11) 1111-1111', 50, 30),
    ('Cliente 2', 'cliente2@example.com', '(22) 2222-2222', 20, 10),
    ('Cliente 3', 'cliente3@example.com', '(33) 3333-3333', 45, 25),
    ('Cliente 4', 'cliente4@example.com', '(44) 4444-4444', 15, 5),
    ('Cliente 5', 'cliente5@example.com', '(55) 5555-5555', 35, 40),
    ('Cliente 6', 'cliente6@example.com', '(66) 6666-6666', 10, 20),
    ('Cliente 7', 'cliente7@example.com', '(77) 7777-7777', 30, 15),
    ('Cliente 8', 'cliente8@example.com', '(88) 8888-8888', 5, 35),
    ('Cliente 9', 'cliente9@example.com', '(99) 9999-9999', 25, 45),
    ('Cliente 10', 'cliente10@example.com', '(00) 0000-0000', 40, 50);
```

## Como Executar

1. **Instalar o Node.js**: Certifique-se de ter o Node.js instalado no seu sistema.
2. **Clonar o Repositório**: Clone o repositório para a sua máquina.
3. **Instalar Dependências**:
   - Navegue até o diretório raiz do projeto no terminal.
   - Execute `npm install` para instalar todas as dependências necessárias para o backend e o frontend.
4. **Configurar o Banco de Dados**:
   - Configure as informações do banco de dados no arquivo `db.js` no backend e personalize as informações conforme necessário.
5. **Iniciar o Servidor Backend**:
   - Navegue até a pasta do backend e execute `npm start`.
   - O backend estará em execução e ouvindo as solicitações da API.
6. **Iniciar o Servidor Frontend**:
   - Em um novo terminal, navegue até a pasta do frontend e execute `npm start`.
   - O frontend estará acessível no navegador em `http://localhost:3000` (ou na porta configurada).

Certifique-se de que ambos, backend e frontend, estejam em execução para o sistema funcionar corretamente.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo `LICENSE` para obter detalhes.
