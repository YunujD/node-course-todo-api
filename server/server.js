const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

var {
  mongoose
} = require('./db/mongoose');
var {
  Todo
} = require('./models/todos')
var {
  User
} = require('./models/users')

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({text: req.body.text});
  todo.save().then((docs) => {
    res.send(docs).status(200);
  }, (err) => {
    res.status(400).send(err)
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    console.log('Id is not valid');
    return res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      res.status(404).send();
    }
    res.send({todo});
  }, (err) => {
    if (err) {
      res.status(400).send({});
    }
  });

});

app.listen(3000, () => {
  console.log('Server up and running');
})

module.exports = {
  app
};
