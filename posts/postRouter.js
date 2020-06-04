const express = require('express');

const db = require("./postDb.js")

const router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was a problem accessing the posts." })
    })
});

router.get('/:id', validatePostId, (req, res) => {
  db.getById(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "The post could not be retrieved." })
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  db.remove(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was an error deleting the post." })
    })
});

router.put('/:id', validatePostId, (req, res) => {
  db.update(req.params.id, req.body)
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: "There was an error updating the post." })
  })
});



function validatePostId(req, res, next) {
  db.getById(req.params.id)
    .then(data => {
      if (!data) {
        res.status(400).json({ message: "Invalid post id." })
      }
      else {
        req.post = data;
        next();
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "There was an error." });
    })
}

module.exports = router;
