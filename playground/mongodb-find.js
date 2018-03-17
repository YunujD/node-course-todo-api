// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // var test = db.collection('Todos').find({
  //     _id: new ObjectID('5aa95cc0b517546ee2bd8a38')
  //   }).toArray().then((docs) => {
  //   console.log('Todods');
  //   console.log(JSON.stringify(docs, undefined, 2));
  //
  // }, (err) => {
  //   console.log('Unable to return todos', err)
  // });
  // console.log(test.ops);

  // var test = db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todods count: ${count}`);
  //
  // }, (err) => {
  //   console.log('Unable to return todos', err)
  // });
  // console.log(test.ops);

  db.collection('Users').find({name: 'Yunuj'}).toArray().then((res) => {
    console.log(`Users: ${JSON.stringify(res,undefined,2)}`)
  }).catch((err) => {
    console.log(err);
  });
  // db.close();
});
