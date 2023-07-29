

**Descrição:**
Este projeto foi desenvolvido como parte do processo de seleção para uma vaga de emprego. A API desenvolvida permite realizar operações CRUD (Create, Read, Update, Delete) em um banco de dados de clientes. O projeto também inclui uma interface de usuário (front-end) para interagir com a API, mas devido a restrições de tempo, o front-end não foi finalizado completamente. No entanto, a API em si está pronta e funcional.

**Instruções de Instalação:**
1. Baixe o projeto para a sua máquina.
2. Abra uma janela do terminal e navegue até a pasta do projeto "Projeto-Cadastro".
3. Acesse a pasta "server" executando o seguinte comando no terminal:
```
cd server
```
5. Instale as dependências da API executando o seguinte comando:
```
npm install
```
6. Inicie o servidor Node.js usando o nodemon com o seguinte comando:
```
nodemon server
```
7. Abra uma nova janela do terminal e navegue novamente até a pasta do projeto "Projeto-Cadastro".
8. Acesse a pasta "view" executando o seguinte comando no terminal:
```
cd view
```
9. Instale as dependências do front-end executando o seguinte comando:
```
npm install
```
10. Inicie o servidor de desenvolvimento do front-end com o seguinte comando:
```
npm start
```

Funcionalidades:

1. Ver todos os clientes cadastrados:
   Endpoint: `localhost:5000/todosClientes`
   Método: GET

2. Ver todos os dados de um cliente cadastrado, passando um JSON com o CNPJ do cliente:
   Endpoint: `localhost:5000/dadosCliente`
   Método: GET
   Exemplo de JSON: `{ "cnpj": "12345678901234" }`

3. Fazer o cadastro de um cliente por método POST, passando os seguintes campos:
   Endpoint: `localhost:5000/cadastroCliente`
   Método: POST
   Campos obrigatórios no JSON: `{ "nome", "cnpj", "bairro", "log", "cidade", "estado", "pais", "cargo", "telefone", "email" }`

4. Deletar um cliente, removendo também todos os seus contatos e endereço, passando um JSON com o CNPJ do cliente:
   Endpoint: `localhost:5000/deletarCliente`
   Método: POST
   Exemplo de JSON: `{ "cnpj": "12345678901234" }`

5. Atualizar os valores de um cliente por método POST, passando os seguintes campos:
   Endpoint: `localhost:5000/atualizarCliente`
   Método: POST
   Campos obrigatórios no JSON: `{ "nome", "cnpj", "ativo", "bairro", "log", "cidade", "estado", "pais" }`

6. Criar novo contato passando os seguintes campos:
   Endpoint: `localhost:5000/criarNovoContato`
   Método: POST
   Campos obrigatórios no JSON: `{ "cnpj", "cargo", "telefone", "email" }`

7. Atualizar um contato passando os seguintes campos:
   Endpoint: `localhost:5000/atualizarContato`
   Método: POST
   Campos obrigatórios no JSON: `{ "id", "cargo", "telefone", "email" }`

8. Deletar um contato, passando o ID do contato no JSON:
   Endpoint: `localhost:5000/deletarContato`
   Método: POST
   Exemplo de JSON: `{ "id": 1 }`

**Observações:**
- Para as funcionalidades de cadastro, atualização e deleção de clientes e contatos, certifique-se de enviar os dados corretos no corpo da requisição em formato JSON.
- A API utiliza os métodos HTTP POST para as operações de cadastro, atualização e deleção para garantir a segurança e evitar que essas ações sejam executadas inadvertidamente por outros métodos.
- Para executar qualquer uma das ações acima, você pode utilizar ferramentas como Postman ou realizar as requisições HTTP em seu próprio código. Lembre-se de ajustar os dados conforme necessário, como CNPJ, ID, etc.

**Agradecimentos:**
Agradeço novamente a oportunidade de demonstrar as funcionalidades da API. Muito Obrigado pela oportunidade de participar do processo seletivo!
