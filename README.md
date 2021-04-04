# Doctor Case Label - Rui Pedro Dias

## Instalação e execução

### Executar o projeto

De forma a poder executar o projeto, é aconselhado que o utilizador tenha instalado na sua máquina o docker-compose. Mais informação sobre a sua instalação pode ser encontrada [aqui](https://docs.docker.com/compose/install/).

Logo de seguida, o utilizador deve navegar até à diretoria `app` e executar o seguinte comando:

```sh
    docker-compose -f docker-compose.yaml -f docker-compose-local.yaml up --build
```

Este comando vai fazer build e executar todos os containers necessários para o projeto.

### Executar os testes unitários

De forma a executar os testes unitários, o projeto deve estar up. E num novo terminal deve ser executado o comando:

```sh
    docker-compose exec api npm run test
```

## Estrutura do projeto

Este projeto foi desenvolvido com recurso à framework Express.js.

Todo o backend encontra-se na pasta `/services/api` e o frontend na pasta `/www`.

Foi seguida a estrutura de design de model-controller, onde os modelos definem a estrutura de dados na base de dados MongoDb, com recurso à biblioteca Mongoose, e o controller, responsável por fazer o handling de todos os requests enviados pela webapp.
