# CRUD example

## Setting up the project

Start a MongoDB instance locally with Docker.

```bash
docker run -d --name mongo -v mongo:/data -p 27017:27017 mongo
```

Then install the dependencies and start the project.

```bash
npm ci
npm start
```
