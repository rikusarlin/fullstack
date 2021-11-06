const { setAsync, getAsync } = require('../redis');
const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const added_todos = await getAsync("added_todos")
  var added_todos_int = 0;
  if(added_todos){
    added_todos_int = parseInt(added_todos);
  }
  await setAsync("added_todos", (added_todos_int+1).toString());
  res.send(todo);
});

/* DELETE todo. */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  if (!todo) {
    return res.sendStatus(404);
  } else {
    await Todo.deleteOne(todo);
    const added_todos = await getAsync("added_todos")
    var added_todos_int = 0;
    if(added_todos){
      added_todos_int = parseInt(added_todos);
    }
    await setAsync("added_todos", (added_todos_int-1).toString());
    res.sendStatus(200);
  }
});

/* GET todo. */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  if (!todo) {
    return res.sendStatus(404);
  } else {
    res.send(todo.toJSON());
  }
})

/* PUT todo. */
router.put('/:id', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, 
    { new: true,
      useFindAndModify: false})
  if (!updatedTodo) {
    return res.sendStatus(404);
  } else {
    res.send(updatedTodo.toJSON());
  }
});

module.exports = router;
