const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to DB', err);
  }

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'eat something dog'}).then((res) => {
  //   console.log(JSON.stringify(res, undefined, 4));
  // }).catch((err) => {
  //   console.log(err);
  // });

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'eat something dog'}).then((res)=>{
  //   console.log(res);
  // });

  // db.collection('Todos').findOneAndDelete({completed: false}).then((res)=>{
  //   console.log(res);
  // });

  // db.collection('Users').deleteMany({name:'Yunuj'}).then((res)=>{
  //   console.log(res);
  // });

  db.collection('Users').findOneAndDelete({_id: new ObjectID('5aacf6027d60995b6cc53db2')}).then((res) => {
    console.log(JSON.stringify(res, undefined, 4));

  });
});
