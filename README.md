## API WORKSHOP :department_store:

Esta API é uma plataforma onde pessoas possam cadastrar seus interesses em temas variados. A partir disso possam preparar e agendar workshops sobre os temas disponibilizados na mesma.

### Como baixar e configurar

- Requisitos: NPM e Node.js
- Rodar ``` npm i``` para instalar todas as dependências
- Porta padrão: 3000
- Colocar seus dados referentes ao banco de dados em um arquivo .env, seguindo o exemplo que consta no arquivo .env.example.

**Passo a passo - no terminal: **:runner:

1. Clonar o repositório:

   ```bash
   git clone https://github.com/evaristux1/api-workshop.git
   ```

   

2. Após clonar e instalar as dependências:

   ```js
   npm start
   ```

Agora o servidor está ouvindo a portal 3000 do localhost.



### Como usar o servidor

Todos os endPoints começam com: localhost:3000/api/workshop.

As rotas estão divididas por features: autenticação, usuários,  temas, interesses e agenda.

❑ **Autenticação**

POST /auth/login: :yellow_heart:

​	Nesta rota o cliente conseguirá obter o token que garante sua identidade. Token será necessário para 	acesso em algumas outras rotas da API. Cliente deverá passar no body um json contendo e-mail e senha previamente cadastrados na rota POST /users.

Na rota ```localhost:3000/api/workshop/auth/login``` passe o email e senha cadastrado.

```json
//Exemplo:
{"email":"exemplo@exemplo.com", "senha":"admin"}
```

❑ **Usuários**

POST /users: :yellow_heart:

​	Nesta rota o cliente poderá cadastrar usuários com as seguintes informações: nome, e-mail, senha e tipo (estudante ou instrutor). Deve-se guardar e-mail e senha para posterior autenticação.

Na rota ```localhost:3000/api/workshop/users``` :

```json
//Exemplo:
{"name":"username123", "email":"exemplo@exemplo.com", "password":"admin", "type":"instructor"}
# O type pode ser instructor ou student.
```

GET /users/{id} :green_heart:

​	Nesta rota o cliente poderá ver as informações cadastradas do usuário com id passada no parâmetro. Deverá passar no header o token de autenticação.

Na rota ```localhost:3000/api/workshop/users/:id``` :

```json
//Passe o token no header, crie uma chave "token" e envie o token devolvido na autenticação.
#Será retornado as informações cadastradas do usuário, mas o usuário não pode ver as informações de outros usuários. 
//Exemplo de resposta: 
{
    "id": 1,
    "name": "username123",
    "email": "exemplo@exemplo.com",
    "type": "instructor",
    "createdAt": "2021-10-15T20:15:37.000Z",
    "updatedAt": "2021-10-15T20:15:37.000Z"
}
```



PATCH /users/{id} :black_heart:

​	Nesta rota o cliente poderá editar toda ou parte de informações cadastradas no seu usuário. Deverá passar no header o token de autenticação.

Na rota ```localhost:3000/api/workshop/users/:id``` :

```json
//Passe o token no header, crie uma chave "token" e envie o token devolvido na autenticação.
# Não é necessário passar o ID do usuário, ele procurara automaticamente.
//Exemplo:
{"email":"meuNome@meuNome.com"}
```



❑ **Temas**

POST /themes :yellow_heart:

​	Nesta rota o cliente poderá cadastrar temas para workshop com as seguintes informações: título e descrição. Deverá passar no header o token de autenticação.

Na rota ```localhost:3000/api/workshop/themes```

```json
//Passe o token no header, crie uma chave "token" e envie o token devolvido na autenticação.

//Exemplo:
{"title": "Como postar um tema","description": "Exemplo de como postar um tema"}

# Não é necessário passar o ID do usuário, ele cadastrará automaticamente.
```



GET /themes :green_heart:

​	Nesta rota o cliente poderá ver todos os temas que já foram cadastrados. Poderá passar como parâmetro quantos itens gostaria de ver por página (pageSize) ou qual página gostaria de acessa (page).

Na rota ```localhost:3000/api/workshop/themes?pageSize=3&page=1``` :

```json
// Não é necessário um token, os parâmetros "pageSize" e "page" são opcionais.
// Caso não seja enviado parâmetros ele irá page será igual a 1 e pageSize igual a 5
//Exemplo de resposta:
{
    "totalPages": 1,
    "totalItems": 1,
    "data": [
        {
            "id": 1,
            "title": "Como postar um tema",
            "description": "Exemplo de como postar um tema",
            "userId": 1
        },
        ]
}
```



GET /themes/{id} :green_heart:

​	Nesta rota o cliente poderá ver todas as informações cadastradas relativas ao tema com o id passado como parâmetro.

Na rota ```localhost:3000/api/workshop/themes/:id``` :

```json
// Não é necessário um token, os parâmetros "pageSize" e "page" são opcionais.
//Exemplo de resposta: 
{
    "id": 1,
    "title": "Como postar um tema",
    "description": "Exemplo de como postar um tema",
    "createdByName": "username123",
    "interesteds": [
        "Dante",
        "Bezerra"
    ],
    "schedule": {
        "instructor": "username123",
        "date": "2021-10-16T00:00:00.000Z",
        "themes": [
            {
                "id": 1,
                "title": "Como postar um tema"
            }
        ]
    }
}
```



PATCH /themes/{id} :black_heart:

​	Nesta rota o cliente poderá editar informações relativas ao tema cujo id foi passado por parâmetro. Deverá passar no header o token de autenticação.

Na rota ```localhost:3000/api/workshop/themes/:id``` :

```json
//Passe o token no header, crie uma chave "token" e envie o token devolvido na autenticação.
# Não é necessário passar o ID do usuário, ele procurara automaticamente.
{"title":"Exemplo de Atualização"}
```

❑ **Interesses** 

POST /interests :yellow_heart:

​	Nesta rota o cliente poderá cadastrar o interesse de um usuário autenticado em um tema, com a seguinte informação: "themeId” (id do tema) . Deverá passar no header o token de autenticação.

Na rota ```localhost:3000/api/workshop/interests``` :

```json
//Passe o token no header, crie uma chave "token" e envie o token devolvido na autenticação.
//Exemplo
{"themeId":1}

# Não é necessário passar o ID do usuário, ele cadastrará automaticamente.
```



DELETE /interests/{id} :red_circle:

​	Nesta rota o cliente poderá excluir o interesse do usuário autenticado. Deverá passar no header o token de autenticação.

Na rota ```localhost:3000/api/workshop/interests/:id``` :

```json
//Passe o token no header, crie uma chave "token" e envie o token devolvido na autenticação.
//Um usuário não pode apagar o interesse de outro.
```



GET /interests :green_book:

​	Nesta rota o cliente acessará a lista de interesses do usuário autenticado. Poderá passar como parâmetro quantos itens gostaria de ver por página (pageSize) ou qual página gostaria de acessa (page). Deverá passar no header o token de autenticação.

Na rota ```localhost:3000/api/workshop/interests``` :

```json
//Passe o token no header, crie uma chave "token" e envie o token devolvido na autenticação.
# Não é necessário passar o ID do usuário, ele procurara automaticamente.
//Exemplo de resposta:
{
    "totalPages": 1,
    "totalItems": 1,
    "data": [
        {
            "id": 1,
            "userId": 1,
            "theme": 1
        },
    ]
}
```





**❑ Agenda**

- **Apenas instrutores terão acessos a rotas privadas de agenda.**

POST /schedules :yellow_heart:

​	Nesta rota o cliente poderá cadastrar um agendamento com as seguintes informações: “themes” (array de temas), “instructorId” (id do instrutor autenticado), “title” (título do agendamento), “description” (descrição do agendamento),  “date” (data e hora do agendamento). Deverá passar no header o token de autenticação.

Na rota `localhost:3000/api/workshop/schedules` :

```json
//Passe o token no header, crie uma chave "token" e envie o token devolvido na autenticação.
# Não é necessário passar o ID do usuário, ele cadastrará automaticamente.
//Exemplo:
{
    "themes":[1],
    "title":"Horário de Testes",
    "description":"Organizaremos os horários de teste",
    "date":"2021-10-16"
}
# O themes aceita o array com os ids dos temas.
```



GET /schedules :green_heart:

​	Nesta rota o cliente poderá ver todos os agendamentos criados pelo instrutor autenticado. Poderá passar como parâmetro quantos itens gostaria de ver por página (pageSize) ou qual página gostaria de acessa (page). Deverá passar no header o token de autenticação.

Na rota `localhost:3000/api/workshop/schedules` :

```json
//Passe o token no header, crie uma chave "token" e envie o token devolvido na autenticação.
# Não é necessário passar o ID do usuário, ele procurara automaticamente.
```

PATCH /schedules/{id} :black_heart:

​	Nesta rota o cliente poderá editar as informações da agenda do instrutor autenticado. Deverá passar no header o token de autenticação.

Na rota `localhost:3000/api/workshop/schedules/:id` :

```json
//Passe o token no header, crie uma chave "token" e envie o token devolvido na autenticação.
//Exemplo:
{"date":"2021-10-15", "title":"Criação de um novo S.O","description":"Vamos criar!"}
# Ele só aceita atualizar o campo data, title e description.
```



DELETE /schedules/{id}/themes/{themeId} :red_circle:

​	Nesta rota o cliente poderá excluir um tema de uma agenda. Deverá passar no header o token de autenticação.

Na rota `localhost:3000/api/workshop/schedules/:id/themes/:id` :

```json
//Passe o token no header, crie uma chave "token" e envie o token devolvido na autenticação.
```



POST /schedules/{id}/themes :yellow_heart:

​	Nesta rota o cliente poderá cadastrar um tema de uma agenda, com a seguinte informação: "themeId” (id do tema). Deverá passar no header o token de autenticação.

Na rota `localhost:3000/api/workshop/schedules/:id/themes` :

```json
//Passe o token no header, crie uma chave "token" e envie o token devolvido na autenticação.
//Exemplo:
{"themeId":"4"}
```

### Esperamos que a API lhe seja útil.
