## **# API WORKSHOP**

Esta API é uma plataforma onde pessoas possam cadastrar seus interesses em temas variados. A partir disso possam preparar e agendar workshops sobre os temas disponibilizados na mesma.



### Como baixar e configurar

- Requisitos: NPM e Node.js
- Rodar npm i para instalar todas as dependências
- Porta padrão: 3000
- Colocar seus dados referentes ao banco de dados em um arquivo .env, seguindo o exemplo que consta no arquivo .env.example.

**Passo a passo - no terminal:**

1- clonar o repositório:

git clone https://github.com/evaristux1/api-workshop

2- Após clonar, instalar as dependências:

npm start

Agora o servidor está ouvindo.



### Como usar o servidor

Todos os endPoints começam com: localhost:3000/api/workshop.

As rotas estão divididas por features: autenticação, usuários,  temas, interesses e agenda.



❑ **Autenticação**

POST /auth/login:

​	Nesta rota o cliente conseguirá obter o token que garante sua identidade. Token será necessário para 	acesso em algumas outras rotas da API. Cliente deverá passar no body um json contendo e-mail e senha previamente cadastrados na rota POST /users.



❑ **Usuários**

POST /users:

​	Nesta rota o cliente poderá cadastrar usuários com as seguintes informações: nome, e-mail, senha e tipo (estudante ou instrutor). Deve-se guardar e-mail e senha para posterior autenticação.

GET /users/{id}

​	Nesta rota o cliente poderá ver as informações cadastradas do usuário com id passada no parâmetro. Deverá passar no header o token de autenticação.

PATCH /users/{id}

​	Nesta rota o cliente poderá editar informações cadastradas no seu usuário. Deverá passar no header o token de autenticação.



❑ **Temas**

POST /themes

​	Nesta rota o cliente poderá cadastrar temas para workshop com as seguintes informações: título e descrição. Deverá passar no header o token de autenticação.

GET /themes

​	Nesta rota o cliente poderá ver todos os temas que já foram cadastrados. Poderá passar como parâmetro quantos itens gostaria de ver por página (pagSize) ou qual página gostaria de acessa (page).

GET /themes/{id}

​	Nesta rota o cliente poderá ver todas as informações cadastradas relativas ao tema com o id passado como parâmetro.

PATCH /themes/{id}

​	Nesta rota o cliente poderá editar informações relativas ao tema cujo id foi passado por parâmetro. Deverá passar no header o token de autenticação.



❑ **Interesses** POST /interests

​	Nesta rota o cliente poderá cadastrar o interesse de um usuário autenticado em um tema, com a seguinte informação: "themeId” (id do tema) . Deverá passar no header o token de autenticação.

DELETE /interets/{id}

​	Nesta rota o cliente poderá excluir o interesse do usuário autenticado. Deverá passar no header o token de autenticação.

GET /interests

​	Nesta rota o cliente acessará a lista de interesses do usuário autenticado. Poderá passar como parâmetro quantos itens gostaria de ver por página (pagSize) ou qual página gostaria de acessa (page). Deverá passar no header o token de autenticação.



**❑ Agenda**

- **Apenas instrutores terão acessos a rotas privadas de agenda.**

POST /schedules

​	Nesta rota o cliente poderá cadastrar um agendamento com as seguintes informações: “themes” (array de temas), “instructorId” (id do instrutor autenticado), “title” (título do agendamento), “description” (descrição do agendamento),  “date” (data e hora do agendamento). Deverá passar no header o token de autenticação.

GET /schedules

​	Nesta rota o cliente poderá ver todos os agendamentos criados pelo instrutor autenticado. Poderá passar como parâmetro quantos itens gostaria de ver por página (pagSize) ou qual página gostaria de acessa (page). Deverá passar no header o token de autenticação.

PATCH /schedules/{id}

​	Nesta rota o cliente poderá editar as informações da agenda do instrutor autenticado. Deverá passar no header o token de autenticação.

DELETE /schedules/{id}/themes/{themeId}

​	Nesta rota o cliente poderá excluir um tema de uma agenda. Deverá passar no header o token de autenticação.

POST /schedules/{id}/themes

​	Nesta rota o cliente poderá cadastrar um tema de uma agenda, com a seguinte informação: "themeId” (id do tema). Deverá passar no header o token de autenticação.



### Esperamos que a API lhe seja útil.
