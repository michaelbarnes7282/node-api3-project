const express = require('express');

const db = require("./postDb.js")

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});



function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
