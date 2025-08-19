const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

const envData = process.env.NAME1;
const envName = process.env.NAME2;
 
let todos = ["Code", envData, "Sleep", envName];

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  console.log("name:", envData);
  
  let todoList = todos
    .map((todo, index) => `<li>${todo} <a href="/delete/${index}">❌</a></li>`)
    .join("");

  res.send(`
    <html>
      <head>
        <title>Simple ToDo App</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          form { margin-bottom: 20px; }
          input[type="text"] { padding: 5px; width: 200px; }
          button { padding: 5px 10px; }
        </style>
      </head>
      <body>
        <h2>New Latest ToDos List</h2>
        <form action="/add" method="POST">
          <input type="text" name="todo" required />
          <button type="submit">Add</button>
        </form>
        <ul>${todoList}</ul>
      </body>
    </html>
  `);
});

app.post("/add", (req, res) => {
  const todo = req.body.todo;
  todos.push(todo);
  res.redirect("/");
});

app.get("/delete/:index", (req, res) => {
  const index = req.params.index;
  todos.splice(index, 1);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`ToDo app running at http://localhost:${PORT}`);
});
