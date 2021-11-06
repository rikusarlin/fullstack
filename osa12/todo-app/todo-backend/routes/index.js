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
  const added_todos = parseInt(await getAsync("added_todos"));
  res.send({
    "addded_todos": added_todos
  });
});

module.exports = router;