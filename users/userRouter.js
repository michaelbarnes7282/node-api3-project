const express = require('express');

const db = require("./userDb")
const postDb = require("../posts/postDb")

const router = express.Router();



router.post('/', validateUser, (req, res) => {
  let newUser = req.body;
  db.insert(newUser)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "The New user could not be saved." })
    })
});

router.post('/:id/posts', validateUserID, validatePost, (req, res) => {
  const newPost = req.body;
  const id = req.params.id;
  newPost.user_id = id;

  postDb.insert(newPost)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The Post could not be saved." })
    })
});

router.get('/', (req, res) => {
  db.get()
    .then( data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "There was a problem accessing the users."})
    })
});

router.get('/:id', validateUserID, (req, res) => {
  let id = req.params.id
  db.getById(id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "The user could not be retrieved." })
    })
});

router.get('/:id/posts', validateUserID, (req, res) => {
  db.getUserPosts(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was an error accessing the posts." });
    })
});

router.delete('/:id', validateUserID, (req, res) => {
  db.remove(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was an error deleting the user." });
    })
});

router.put('/:id', validateUserID, validateUser, (req, res) => {
  db.update(req.params.id, req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was an error updating the user." })
    })
});

//custom middleware

function validateUserID(req, res, next) {
  let id = req.params.id;
  console.log(req.params.id)
  db.getById(id)
    .then(data => {
      if (data === undefined) {
        res.status(400).json({ message: "Invalid user id" });
      }
      else {
        req.user = data;
        next();
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "There was an error." });
    })
}

function validateUser(req, res, next) {
  const newUser = req.body;
  console.log(req)
  if (!newUser) {
    res.status(400).json({ message: "missing user data" });
  }
  else if (!newUser.name) {
    res.status(400).json({ message: "missing required name field" });
  }
  else {
    next();
  }
}

function validatePost(req, res, next) {
  const newPost = req.body;
  if(!newPost) {
    res.status(400).json({ message: "missing post data" });
  }
  else if (!newPost.text){
    res.status(400).json({ message: "missing required text field" });
  }
  else {
    next();
  }
}

module.exports = router;
