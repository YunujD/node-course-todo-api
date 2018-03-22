const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/users');


Todo.findOneAndRemove('5ab3ddb3ccdc6e6c15293a63').then((res)=>{
  console.log(res);
}, ()=>{});
