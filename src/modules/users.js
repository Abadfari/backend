const fs = require("fs");
const path = require("path");

function getUsers() {
  const filePath = path.join(__dirname, "/users.json");
  return fs.readFileSync(filePath);
}

module.exports = getUsers;
