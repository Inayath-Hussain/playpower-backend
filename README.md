# PlayPower labs backend assignment

## Tech used
- Express
- Postgresql
- prisma
- Docker

## Api Documentation
Link for api documentation - [POSTMAN](https://documenter.getpostman.com/view/24398247/2sA3Qs9rRc)


## Steps to run project locally
Clone this repository and run
`npm install` from the base dir of the repo.

Create a postgres db and once the installation is done run command `npx prisma migrate dev` from the base dir to create table according to prisma schema. Schema can be found in `prisma/schema.prisma`.


Now run `npm run build` to build the project.

Create .env file at the base dir and add necessary key value pairs. All the required keys can be found in `src/config/env.ts` file.

Now run `node dist/server.js`.

<br />

## Steps to build and publish docker image
You need docker and docker-compose installed in your machine.

Create [docker hub](https://hub.docker.com/) account. And login to the account using cli `docker login`.


<br />
Build your Docker image from your Dockerfile. Make sure you tag it with your Docker Hub username and repository name.

`docker build -t your-username/your-repository-name:tag .`

<br />
Push your Docker image to Docker Hub.

`docker push your-username/your-repository-name:tag`

<br />

## Steps to run app inside docker

Run `docker-compose up` to run the app in a docker container.

If you are running the app for first time inside a docker or made changes to code then add `--build` flag.
`docker-compose up --build`.
