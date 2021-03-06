require('./config/config');

const _ = require('lodash');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos')
const {User} = require('./models/users')

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
    return res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }, (err) => res.status(404).send());
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send(todo);
  }, (err) => {
    res.status(404).send();
  });
})

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {
    $set: body
  }, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send(todo);
  }).catch((err) => {
    res.status(400).send(err);
  });
})

app.listen(port, () => {
  console.log(`Server up and running in port ${port}`);
})

module.exports = {
  app
};
