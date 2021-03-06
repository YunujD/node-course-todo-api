const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {app} = require('./../server');
const {Todo} = require('./../models/todos');

const todos = [
  {
    _id: new ObjectID(),
    text: 'first test todo'
  }, {
    _id: new ObjectID(),
    text: 'second test todod',
    completed: true,
    completedAt: 333
  }
];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());

})

describe('POST /todos', () => {
  it('Should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app).post('/todos').send({text}).expect(200).expect((res) => {
      expect(res.body.text).toBe(text);
    }).end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((err) => done(err));
    });
  });

  it('Should not create todo with invalid body data', (done) => {
    request(app).post('/todos').send({}).expect(400).end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((err) => {
        done(err)
      });
    })
  });
});

describe('GET /todos', () => {
  it('Should return all the todos', (done) => {
    request(app).get('/todos').expect(200).expect((res) => {
      expect(res.body.todos.length).toBe(2);
    }).end(done);
  });
});

describe('GET /todos/:id', () => {
  it('Should return todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(todos[0].text)
    })
    .end(done);
  });

  it('Should return a 404 if todo not found', (done) => {
    var hexID = new ObjectID().toHexString();
    request(app).get(`/todos/${hexID}`).expect(404).end(done);

  });

  it('Should return a 404 for non-object id', (done) => {
    request(app).get('/todos/123').expect(404).end(done);
  });
});


describe('PATCH /todos/:id',()=>{
  it('Should update the todo',(done)=>{
    var todo = {
      text: 'Updated todo',
      completed: true
    };

    request(app)
      .patch(`/todos/${todos[0]._id.toHexString()}`)
      .send(todo)
      .expect(200)
      .expect((res)=>{
        expect(_.pick(res.body, ['text','completed'])).toEqual(todo);
        // expect(res.body.completedAt).toBeA('number');
      })
      .end(done);
  });
  var todo_negative = {
    text: 'Latest todo',
    completed: false
  };

  it('Should clear completedAt when completed is not true',(done)=>{
    request(app)
      .patch(`/todos/${todos[1]._id.toHexString()}`)
      .send(todo_negative)
      .expect(200)
      .expect((res)=>{
        expect((_.pick(res.body,['completedAt'])).completedAt).toBe(null);
      })
      .end(done);
  });
});
