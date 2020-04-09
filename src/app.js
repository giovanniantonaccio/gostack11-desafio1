const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;
  const id = uuid();
  
  const project = {
    id,
    url,
    title,
    techs,
    likes: 0
  };
  repositories.push(project);

  return response.json(project);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const index = repositories.findIndex(repository => repository.id === id);
  
  if(index < 0) 
    return response.status(400).json({ error: 'ID does not exist'})
  
  const updated = {
    ...repositories[index],
    url,
    title,
    techs
  };

  repositories[index] = updated;

  return response.json(updated);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(repository => repository.id === id);
  
  if(index < 0) 
    return response.status(400).json({ error: 'ID does not exist'})
  
  repositories.splice(index, 2);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(repository => repository.id === id);
  
  if(index < 0) 
    return response.status(400).json({ error: 'ID does not exist'});
  
  const updated = {
    ...repositories[index],
    likes: repositories[index].likes + 1
  }

  repositories[index] = updated;

  return response.json(updated);
});

module.exports = app;
