var express = require("express");
var router = express.Router();
const db = require("../model/helper");

//What you see when you enter on the main api page
router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

const sendAllToDos = (req, res) => {};

router.get("/todos", (req, res) => {
  // Send back the full list of items
  sendAllToDos(req, res);
});

router.post("/todos", (req, res) => {
  // The request's body is available in req.body
  // If the query is successfull you should send back the full list of items
  // Add your code here
  // INSERT INTO items (text, complete) VALUES ("Chores", 0); -> this is the QUERY
  db(
    `INSERT INTO items (text, complete) VALUES ("${req.body.text}", ${req.body.complete});`
  )
    .then(() => {
      sendAllToDos(req, res);
    })
    .catch(err => res.status(500).send(err));
});

router.put("/todos/:todo_id", (req, res) => {
  // The request's body is available in req.body
  // URL params are available in req.params
  // If the query is successfull you should send back the full list of items
  // Add your code here
  db(
    `UPDATE items SET text = "${req.body.text}", complete = ${req.body.complete} WHERE id = ${req.params.todo_id};`
  )
    .then(() => {
      sendAllToDos(req, res);
    })
    .catch(err => res.status(500).send(err));
});

router.delete("/todos/:todo_id", (req, res) => {
  // URL params are available in req.params
  // Add your code here
  //
  db(`DELETE FROM items WHERE id = ${req.params.todo_id};`)
    .then(() => {
      sendAllToDos(req, res);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
