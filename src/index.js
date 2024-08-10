const getUsers = require("./modules/users");
const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log("Сервер запущен на порту: " + PORT);
});

app.get("*", (request, response) => {
  const url = new URL(request.url, "http://localhost:3005");
  switch (url.pathname) {
    case "/":
      if (url.searchParams.size) {
        const hasHello = url.searchParams.has("hello");
        const hasUsers = url.searchParams.has("users");
        if (hasHello) {
          const value = url.searchParams.get("hello");
          if (value) {
            response.status(200).send("Hello, " + value);
          } else {
            response.status(400).send("Enter a name");
          }
          return;
        }
        if (hasUsers) {
          const userData = getUsers();
          response.status(200).json(JSON.parse(userData));
          return;
        }
        response.status(500).send("Invalid queries");
      }
      response.status(200).send("Hello, world");
      break;

    default:
      response.status(500).send("Invalid endpoint");
      break;
  }
});
