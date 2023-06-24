<p align="center">
 <a href="#computer-o-projeto">Sobre</a> •
 <a href="#computer-tecnologias">Tecnologias usadas</a> • 
 <a href="#mag_right-para-rodar-o-projeto">Como rodar</a> • 
 <a href="#mag_right-rotas">Rotas</a> • 
</p>

## :computer: O projeto

- Sistema de cadastro e cancelamento de usuários, onde é usado uma arquitetura de mensageria para aproveitar o assincronismo. Uma API para entrada de dados do cliente com 3 rotas (Login, Cadastro e Atualização, e por ultímo o Cancelamento) e um servidor que trabalha como consumer, ouvindo a fila e fazendo os procedimentos no banco de dados.

## :computer: Tecnologias

- Node, Typescript, Fastify.
- Clean Architechture.
- SOLID, POO.
- MySQL, Prisma ORM.
- Redis para cache.
- RabbitMQ para mensageria.
- Bcrypt para criptografia de login e senha
- Fastify-JWT para autorização
- Docker e Docker-Compose.
- Mocha e Chai para testes
- Wiston para logs da aplicação
- Cluster e Compress para melhoria de desempenho.

## :mag_right: Para rodar o projeto:

```bash
# Pré requisitos
- Docker instalado na máquina

# Faça o clone do repositório
$ git clone

# Acesse a pasta do projeto no terminal
$ cd pasta

# Criar as variaveis para o container.
$ Para melhorar o teste da aplicação, foi retirado o .env de dentro do gitignore, para início imediato do sistema sem a necessidade de configuração

# Faça a instalação e execução de todos os containers com o compose
$ docker-compose up --build

# Para rodar os testes
$ Em outro terminal executar o comando abaixo com o compose ligado
$ 'docker exec -it {id do container} sh -c 'npm run test'

```

## :mag_right: Rotas:

- Utilizar ferramentas como Postman ou Insomnia.

```bash
** Login User **

$ Path: http://localhost:8081/user/login

$ Body:
#   {
#       "username": "teste",
#       "password": "@teste"
#   }



** Create or Update User **

$ Path: http://localhost:8081/user

$ Body:
#   {
#        "name": "Victor Castro",
#        "username": "teste",
#        "email": "teste@gmail.com",
#        "password": "@teste",
#        "birthdate": "25-12-2049"
#    }



** Cancel User **

$ Path: http://localhost:8081/user/cancel

$ Authorization Bearer : enabled
# Informar o token. ( Somente o usuário logado pode pedir o cancelamento da sua conta )

$ Body:
#    {
#        "username": "teste",
#        "password": "@teste"
#    }
```

Obs: A própria API faz a maior parte das validações e verificações, tanto de campos informados errados, quanto em casos como usuario não existente em rotas de cancelamento e login, onde já é retornado o erro, para arrumar os campos e mandar novamente. No caso de criar ou atualizar um cadastro, é enviado da mesma maneira para a fila. O Consumer que verifica se já existe o usuário e faz o procedimento correto.
