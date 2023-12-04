# nest_cache_graphql_security_app

## Aplicacion Culturas Gastronomicas

### Tecnologies
1. Nest.js
2. TypeORM
3. logica de una entidad, utilizando Nest.js y el ORM TypeORM.
4. Data Transfer Object (DTO)
5. https://www.passportjs.org/
6. https://kuros.in/typescript/nestjs-role-based-authentication-and-authorization-using-guards/
7. cache-manager y @Types/cache-manager.
8. nestjs/graphql @nestjs/apollo graphql apollo-server-express

## Collections

The folder **collections_all** has all collections for this API, its has examples too.

## Dockerfile y docker-compose

run Dockerfile
```shell
docker build -t dev-image . -f dev.Dockerfile
```

```shell
docker run -p 3000:3000 dev-image 
```
run docker compose
```shell
docker-compose up --build
```

## graphql
9. http://localhost:3000/graphql
