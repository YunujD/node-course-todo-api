const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log(err);
  }
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5aa963070adaa4231c9ac23f')
  // }, {
  //   $set: {
  //     completed: false
  //   }
  // }, {returnOriginal: false}).then((res) => {
  //   console.log(JSON.stringify(res, undefined, 2));
  // }).catch((err) => {
  //   console.log('Cannot update');
  // });

  db.collection('Users').findOneAndUpdate({
    name: 'Blah'
  }, {
    $set: {
      name: 'Yunuj'
    },
    $inc: {
      age: 100
    }
  }, {returnOriginal: false}).then((res) => {
    console.log(res);
  })

});
