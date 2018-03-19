const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/users');

var id = '5aae2856493a3d4bd3b683be';

// if(!ObjectID.isValid(id)){
//   console.log('Id not valid');
// }

// Todo.find({_id: id}).then((todos) => console.log('Todos:', todos));
// Todo.findOne({_id: id}).then((todo) => console.log('Todo:', todo));
// Todo.findById(id).then((todo) => console.log('Todod:', todo)).catch((err)=>console.log(err));

User.findById(id).then((user) => {
  if (!user) {
    return console.log('User not found');
  }
  console.log('User By Id: ', user);
}).catch((err) => {
  console.log(err)
});
