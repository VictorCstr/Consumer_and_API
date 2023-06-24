<p align="center">
 <a href="#computer-o-projeto">Sobre</a> •
 <a href="#computer-tecnologias">Tecnologias usadas</a> • 
 <a href="#mag_right-para-rodar-o-projeto">Como rodar</a> • 
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
