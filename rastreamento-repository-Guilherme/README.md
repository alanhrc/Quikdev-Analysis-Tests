# Rastreamento
- O projeto trata-se de um sistema de rastreio de entregas/pedidos, com foco na arquitetura, usando alguns conceitos como SOLID e Atomic design.
## Tecnologias
- ReactJs
- Nodejs v18
- Nestjs
- PrismaOrm
- Postgresql
- Jest
- Docker
- Material UI
- JWT e Chaves PEM
## Pré-requisitos

- Node.js (v18.x)
- npm ou yarn
- Docker e Docker Compose (para Prisma, se estiver usando um banco de dados Dockerizado)
- OpenSSL (para gerar chaves PEM)

## Configuração do Ambiente

1. **Clone este repositório.**

    ```bash
    git clone https://github.com/guilherme1-jgp/delliv-repository.git
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    ```

3. **Copie o arquivo de exemplo de configuração**

    ```bash
    cp .env.example
    ```

4. **Inicialize o banco de dados com Prisma:**

    ```bash
    npx prisma db push
    ```

## Gerando Chaves PEM

Para autenticação segura, você precisará de um par de chaves privada e pública no formato PEM. Use o OpenSSL para gerar essas chaves.

1. **Gere uma chave privada (private.pem):**

    ```bash
    openssl genpkey -algorithm RSA -out private.pem
    ```

2. **Extraia a chave pública correspondente (public.pem):**

    ```bash
    openssl rsa -pubout -in private.pem -out public.pem
    ```
    Adicione ambas chaves no diretório keysAccess.

## Executando a Aplicação

- **Inicie a aplicação:**

    ```bash
    npm run start
    ```

    ou

    ```bash
    yarn start
    ```

- Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Comandos Úteis

- **Executar Testes:**

    ```bash
    npm run test:watch
    ```

 **Construa as imagens e inicie os contêineres:**

    ```bash
    docker-compose up
    ```

## Regras e futuras features
- Somente admin pode fazer alteracoes, e criar os usuarios para o sistema.
- Feature futura/andamento: Notificacoes referente a alteracao do pedido e a permissao. 
