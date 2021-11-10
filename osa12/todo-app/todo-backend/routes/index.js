const express = require('express');
const { setAsync, getAsync } = require('../redis');
const router = express.Router();

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

/* GET usage stats */
router.get('/statistics', async (req, res) => {
  const added_todos = await getAsync("added_todos")
  var added_todos_int = 0;
  if(added_todos){
    added_todos_int = parseInt(added_todos);
  }
  res.send({
    "addded_todos": added_todos_int
  });
});

/* GET greeting */
router.get('/hello', async (req, res) => {
  res.send({
    "message": "Well, hi there you nerdy thing!"
  });
});


module.exports = router;
